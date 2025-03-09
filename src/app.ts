// import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import AuthUseCase from './application/use-cases/auth-use-case';
import TokenService from './application/services/token-service';
import UserRepository from './infra/repositories/memory/user-repository';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const authHandler = async (event: any): Promise<any> => {
    try {
        const body = JSON.parse(event.body);

        const useCase = new AuthUseCase(
            new UserRepository(),
            new TokenService(),
        );

        const output = await useCase.execute(body.cpf);

        return {
            statusCode: 200,
            body: JSON.stringify(output),
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: err.message,
            }),
        };
    }
};

export const authorizationHandler = async (event: any): Promise<any> => {
    return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Basic test!',
            }),
        };
}
