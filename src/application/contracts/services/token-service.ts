export default interface TokenService {
  generateToken(cpf: string): Promise<string>;
}