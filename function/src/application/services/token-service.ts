import Contract from "../contracts/services/token-service";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export default class TokenService implements Contract {
  generateToken(cpf: string): Promise<string> {
    return new Promise((resolve) => {
      const accessToken = jwt.sign(cpf, JWT_SECRET);

      resolve(accessToken);
    });
  }

  public validateToken(accessToken: string): Promise<{ cpf: string; }> {
    return new Promise((resolve, reject) => {
      const splitedToken = accessToken.split(/\s+/);

      if (splitedToken[0] !== 'Bearer') {
        reject(new Error("Token invalido"))
      }

      const payload = jwt.verify(splitedToken[1], JWT_SECRET);

      if (payload) {
        resolve({ cpf: payload as string })
      } else {
        reject(new Error("Token invalido"))
      }
    });
  }
}