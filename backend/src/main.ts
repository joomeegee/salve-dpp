import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Bootstrap local');

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(3333);
}

bootstrap();
