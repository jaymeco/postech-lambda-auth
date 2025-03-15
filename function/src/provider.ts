import { UserRepositorySymbol } from "./application/contracts/repositories/user-repository";
import { TokenServiceSymbol } from "./application/contracts/services/token-service";
import TokenService from "./application/services/token-service";
import UserMemoryRepository from "./infra/repositories/memory/user-repository";

export default {
  [UserRepositorySymbol]: new UserMemoryRepository(),
  [TokenServiceSymbol]: new TokenService(),
}