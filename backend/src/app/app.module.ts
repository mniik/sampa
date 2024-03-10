import { Module } from '@nestjs/common';
import { ConfigModule } from "../config/config.module";
import { ComponentsModule } from "../components/components.module";
import { HashModule } from "../core/hash/hash.module";

@Module({
  imports: [
    ConfigModule,
    ComponentsModule,
    HashModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  //
}
