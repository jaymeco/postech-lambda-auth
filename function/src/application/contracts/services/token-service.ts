export const TokenServiceSymbol = Symbol('TokenService');

export default interface TokenService {
  generateToken(cpf: string): Promise<string>;
  validateToken(token: string): Promise<{cpf: string}>
}