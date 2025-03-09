import User from "../../../domain/entities/user";

export default interface UserRepository {
  find(cpf: string): Promise<User>;
  create(user: User): Promise<void>;
}