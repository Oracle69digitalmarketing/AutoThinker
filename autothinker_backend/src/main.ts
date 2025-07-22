import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your Vercel frontend
  app.enableCors({
    origin: 'https://v0-let-s-build-ruby.vercel.app', // Your Vercel frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Important if you plan to use cookies/auth headers
  });

  // Apply global validation pipe for DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Use process.env.PORT for Render deployment environment
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
