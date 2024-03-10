import { Module } from '@nestjs/common';
import { ConfigModule } from "../config/config.module";
import { ComponentsModule } from "../components/components.module";


@Module({
  imports: [
    ConfigModule,
    ComponentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  //
}
