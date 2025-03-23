import { expect, describe, it } from '@jest/globals';
import AuthUseCase from '../../src/application/use-cases/auth-use-case';
import UserMemoryRepository from '../../src/infra/repositories/memory/user-repository';
import TokenService from '../../src/application/services/token-service';
import CpfNotProvidedException from '../../src/application/exceptions/cpf-not-provided-exception';

describe('Teste do caso de uso de autenticacao', function () {
  it('Deve autenticar o usuario com cpf ja informado', async () => {
    const cpf = '86202230541';

    const useCase = new AuthUseCase(
      new UserMemoryRepository(),
      new TokenService(),
    );

    const output = await useCase.execute(cpf);

    expect(output.code).toBe('AUTHENTICATED');
    expect(output.accessToken).toBeDefined();
  });

  it('Nao deve autenticar o usuario caso o cpf nao seja informado', async () => {
    const cpf = '';

    const useCase = new AuthUseCase(
      new UserMemoryRepository(),
      new TokenService(),
    );

    expect(async () => await useCase.execute(cpf)).rejects.toThrow(CpfNotProvidedException);
  });
});
