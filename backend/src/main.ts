import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {useContainer} from "class-validator";
import {ConfigService} from "@nestjs/config";
import CorsConfig from "./config/cors.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: CorsConfig,
  });

  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get('app.port', 3001));
}
bootstrap();
