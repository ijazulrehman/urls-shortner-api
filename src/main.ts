import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UrlModule } from './url/url.module';

async function bootstrap() {
  const app = await NestFactory.create(UrlModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  const port = +process.env.APP_PORT || 3000;

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('URLs Shortener')
    .setDescription('URLs Shortener API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(port);
}
bootstrap();
