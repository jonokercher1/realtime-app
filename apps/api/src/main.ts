import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseValidationInterceptor } from './interceptors/response-validation.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseValidationInterceptor());

  await app.listen(port);
}
bootstrap();
