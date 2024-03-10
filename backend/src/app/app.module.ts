import { Module } from '@nestjs/common';
import { ConfigModule } from "../config/config.module";
import { ComponentsModule } from "../components/components.module";
import { HashModule } from "../core/hash/hash.module";
import {SearchModule} from "../core/search/Search.module";
import {AuthModule} from "../components/auth/auth.module";

@Module({
  imports: [
    ConfigModule,
    ComponentsModule,
    HashModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule {
  //
}
