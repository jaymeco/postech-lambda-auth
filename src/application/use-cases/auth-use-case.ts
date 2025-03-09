import User from "../../domain/entities/user";
import UserNotFoundException from "../../infra/exceptions/user-not-found-exceptions";
import UserRepository from "../contracts/repositories/user-repository";
import TokenService from "../contracts/services/token-service";

export default class AuthUseCase {
  public constructor(
    private readonly repository: UserRepository,
    private readonly tokenService: TokenService,
  ) {
  }

  public async execute(cpf: string) {
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