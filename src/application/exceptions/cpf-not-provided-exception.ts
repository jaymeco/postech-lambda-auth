export default class CpfNotProvidedException extends Error {
  public constructor() {
    super("CPF não informado");
  }
}