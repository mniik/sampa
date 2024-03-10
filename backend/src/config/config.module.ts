import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import AppConfig from './app.config';


@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [
        AppConfig,
      ],
    }),
  ],
  controllers: [],
  providers: [],
})

export class ConfigModule {
  //
}
