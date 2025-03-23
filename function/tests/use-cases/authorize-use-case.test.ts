import { expect, describe, it } from '@jest/globals';
import UserMemoryRepository from '../../src/infra/repositories/memory/user-repository';
import TokenService from '../../src/application/services/token-service';
import AuthorizeUseCase from '../../src/application/use-cases/authorize-use-case';

describe('Teste do caso de uso de autorizacao', function () {
  it('Deve autorizar um usuario com o token enviado', async () => {
    const tokenService = new TokenService();
    const token = await tokenService.generateToken('86202230544');
    const accessToken = `Bearer ${token}`;

    const useCase = new AuthorizeUseCase(
      new UserMemoryRepository(),
      tokenService,
    );

    const output = await useCase.execute(accessToken);

    expect(output.code).toBe('AUTHORIZED');
  });
});
