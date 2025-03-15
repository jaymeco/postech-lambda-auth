import { UserRepositorySymbol } from "./application/contracts/repositories/user-repository";
import { TokenServiceSymbol } from "./application/contracts/services/token-service";
import TokenService from "./application/services/token-service";
import UserDynamoRepository from "./infra/repositories/dynamo/user-repository";

export default {
  [UserRepositorySymbol]: new UserDynamoRepository(),
  [TokenServiceSymbol]: new TokenService(),
}