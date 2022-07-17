import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { version } from '../package.json';
import { parse } from 'yaml';
import 'dotenv/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const config = new DocumentBuilder()
  //   .setTitle('Rest API')
  //   .setDescription('The REST API description')
  //   .setVersion(version)
  //   .build();

  const document = await readFile(resolve(cwd(), 'doc', 'api.yaml'), {
    encoding: 'utf8',
  });
  SwaggerModule.setup('doc', app, parse(document));

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('', app, document);

  app
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

  const port = process.env.PORT || 4000;

  await app.listen(port);
}
bootstrap();
