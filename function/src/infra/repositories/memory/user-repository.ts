import Contract from "../../../application/contracts/repositories/user-repository";
import User from "../../../domain/entities/user";
import UserNotFoundException from "../../exceptions/user-not-found-exceptions";

export default class UserRepository implements Contract {
  private database: User[];

  public constructor() {
    this.database = [User.create('86202230544')];
  }

  public find(cpf: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = this.database.find((user) => user.equals(cpf));

      if (!user) {
        reject(new UserNotFoundException());
      } else {
        resolve(user);
      }
    });
  }

  public create(user: User): Promise<void> {
    return new Promise((resolve) => {
      this.database.push(user);

      return resolve();
    })
  }

  public exists(cpf: string): Promise<boolean> {
    return new Promise((resolve) => {
      const user = this.database.find((user) => user.equals(cpf));

      resolve(user !== undefined)
    });
  }
}