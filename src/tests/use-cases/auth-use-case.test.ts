import { expect, describe, it } from '@jest/globals';
import AuthUseCase from '../../application/use-cases/auth-use-case';
import UserMemoryRepository from '../../infra/repositories/memory/user-repository';
import TokenService from '../../application/services/token-service';

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
});
