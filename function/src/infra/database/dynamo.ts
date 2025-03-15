import Aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

Aws.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

export const TABLE_NAME = process.env.DYNAMO_TABLE_NAME ?? "";

export default new Aws.DynamoDB.DocumentClient();