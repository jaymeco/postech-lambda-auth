export default class UserNotFoundException extends Error {
  public constructor() {
    super("Usuario solicitado nao encontrado");
  }
}