import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';

let server: Handler;

const whitelist = ['amazonaws.com', 'localhost', 'localhost:3000'];

const validDomain = (urlString: string) => {
  try {
    const url = new URL(urlString);
    let hostname = url.hostname.split('.').slice(-2).join('.');

    if (
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(
        url.hostname,
      )
    ) {
      hostname = url.hostname;
    }

    return whitelist.includes(hostname);
  } catch (error) {
    console.warn(`Unable to parse domain ${urlString}: ${error}`);
    return false;
  }
};

async function bootstrapServer(): Promise<Handler> {
  console.log('Bootstrap Server');

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      if (origin === undefined || validDomain(origin)) {
        return callback(null, true);
      }

      console.warn(`Request from origin "${origin}" was rejected by CORS`);

      callback(new Error('Rejected by CORS'));
    },
    credentials: false,
  });

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();

  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrapServer());

  return server(event, context, callback);
};
