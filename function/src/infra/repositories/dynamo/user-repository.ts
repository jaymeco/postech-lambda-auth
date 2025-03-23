import Contract from "../../../application/contracts/repositories/user-repository";
import User from "../../../domain/entities/user";
import dynamo, { TABLE_NAME } from "../../database/dynamo";
import UserNotFoundException from "../../exceptions/user-not-found-exceptions";

type Params = {
  TableName: string;
};

export default class UserDynamoRepository implements Contract {
  private params: Params

  public constructor() {
    this.params = { TableName: TABLE_NAME };
  }

  public find(cpf: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await dynamo.get({
          ...this.params,
          Key: { cpf }
        }).promise();

        if(result.Item !== undefined) {
          resolve(User.restore(result.Item?.cpf));
        } else {
          reject(new UserNotFoundException());
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  public create(user: User): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await dynamo.put({
          ...this.params,
          Item: { cpf: user.getCpf() }
        }).promise();

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  public exists(cpf: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await dynamo.get({
          ...this.params,
          Key: { cpf }
        }).promise();

        resolve(result.Item !== undefined);
      } catch (error) {
        reject(error);
      }
    });
  }
}