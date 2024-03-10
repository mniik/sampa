import { Module } from '@nestjs/common';
import {UsersModule} from "../users/users.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {NearbyController} from "./nearby.controller";
import {NearbyService} from "./nearby.service";
import {SearchModule} from "../../core/search/Search.module";

@Module({
  controllers: [NearbyController],
  exports: [NearbyService],
  imports: [
    UsersModule,
    ConfigModule,
    SearchModule,
  ],
  providers: [NearbyService],
})
export class NearbyModule {}
