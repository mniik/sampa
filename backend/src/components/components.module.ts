import { Module } from "@nestjs/common";
import {PrismaModule} from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from './users/users.module';
import {NearbyModule} from "./nearby/nearby.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    NearbyModule
  ],
  providers: [
    //
  ],
  exports: [
    //
  ],
})
export class ComponentsModule {
  //
}
