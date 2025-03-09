import { expect, describe, it } from '@jest/globals';
import UserMemoryRepository from '../../infra/repositories/memory/user-repository';
import TokenService from '../../application/services/token-service';
import AuthorizeUseCase from '../../application/use-cases/authorize-use-case';

describe('Teste do caso de uso de autorizacao', function () {
  it('Deve autorizar um usuario com o token enviado', async () => {
    const token = "Bearer eyJhbGciOiJIUzI1NiJ9.ODYyMDIyMzA1NDQ.38r5C0eVY9PlH_5CQe1RoeHGEEKOnCWzsrzKrymhOxw";

    const useCase = new AuthorizeUseCase(
      new UserMemoryRepository(),
      new TokenService(),
    );

    const output = await useCase.execute(token);

    expect(output.code).toBe('AUTHORIZED');
  });
});
