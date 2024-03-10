import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {SearchModule} from "../../core/search/Search.module";


const jwtFactory = {
  useFactory: async (configService: ConfigService) => {
    return {
      global: true,
      secret: configService.get<string>('auth.secretHash', 'secret'),
      signOptions: {
        expiresIn: configService.get('auth.authLifetime', '2h'),
      },
    };
  },
  inject: [ConfigService],
};

@Module({
  imports:[
    UsersModule,
    SearchModule,
    JwtModule.registerAsync(jwtFactory)
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
