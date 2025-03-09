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
}