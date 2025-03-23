import User from "../../../domain/entities/user";

export const UserRepositorySymbol = Symbol('UserRepository');

export default interface UserRepository {
  find(cpf: string): Promise<User>;
  create(user: User): Promise<void>;
  exists(cpf: string): Promise<boolean>
}