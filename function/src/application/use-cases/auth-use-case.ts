import User from "../../domain/entities/user";
import UserNotFoundException from "../../infra/exceptions/user-not-found-exceptions";
import UserRepository from "../contracts/repositories/user-repository";
import TokenService from "../contracts/services/token-service";
import CpfNotProvidedException from "../exceptions/cpf-not-provided-exception";

export default class AuthUseCase {
  public constructor(
    private readonly repository: UserRepository,
    private readonly tokenService: TokenService,
  ) {
  }

  public async execute(cpf: string) {
    if (cpf === '' || cpf === undefined) {
      throw new CpfNotProvidedException();
    }

    const user = await this.getUser(cpf);
    const output = {
      code: 'AUTHENTICATED',
      accessToken: '',
    };

    if (user) {
      const accessToken = await this.tokenService.generateToken(user.getCpf());
      output.accessToken = accessToken;
    } else {
      output.code = 'UNAUTHENTICATED';
    }

    return output;
  }

  public async getUser(cpf: string): Promise<User | null> {
    let result: User | null = null;

    try {
      const user = await this.repository.find(cpf);

      result = user;
    } catch (error: any) {
      if (error instanceof UserNotFoundException) {
        const newUser = User.create(cpf);

        await this.repository.create(newUser);

        result = newUser;
      }
    }

    return result;
  }
}