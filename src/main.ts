import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
declare const module: any;

const port = process.env.PORT || 1000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(port);
  Logger.log(`🚀 Server running on PORT : ${port}`, 'Bootstrap');
  console.debug('Nest Js Server ready to roll');
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
