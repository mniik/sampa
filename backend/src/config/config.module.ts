import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import AppConfig from './app.config';
import AuthConfig from "./auth.config";
import ElasticConfig from "./elastic.config";


@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [
        AppConfig,
        AuthConfig,
        ElasticConfig
      ],
    }),
  ],
  controllers: [],
  providers: [],
})

export class ConfigModule {
  //
}
