import UserNotFoundException from "../../infra/exceptions/user-not-found-exceptions";
import UserRepository from "../contracts/repositories/user-repository";
import TokenService from "../contracts/services/token-service";

export default class AuthorizeUseCase {
  public constructor(
    private readonly repository: UserRepository,
    private readonly tokenService: TokenService,
  ) {
  }

  public async execute(token: string) {
    const output = await this.tokenService.validateToken(token);

    this.throwErrorIfUserNotExists(output.cpf);

    return {
      code: 'AUTHORIZED'
    };
  }

  private async throwErrorIfUserNotExists(cpf: string) {
    const userExists = await this.repository.exists(cpf);

    if (!userExists) {
      throw new UserNotFoundException();
    }
  }
}