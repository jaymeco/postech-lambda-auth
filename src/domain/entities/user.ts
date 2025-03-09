export default class User {
  private constructor(
    private cpf: string
  ) {
  }

  public static create(cpf: string) {
    return new User(cpf);
  }

  public static restore(cpf: string) {
    return new User(cpf);
  }

  public getCpf() {
    return this.cpf;
  }

  public equals(object: User | string): boolean {
    if (object instanceof User) {
      return object.getCpf() === this.cpf;
    }

    return object === this.cpf;
  }
}