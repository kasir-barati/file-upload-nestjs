import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Title')
  .setDescription('Description')
  .setVersion('1.0')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' })
  .build()
  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, doc);
  await app.listen(9000);
}
bootstrap();
