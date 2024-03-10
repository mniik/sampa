import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";


const jwtFactory = {
  useFactory: async (configService: ConfigService) => {
    return {
      global: true,
      secret: configService.get<string>('auth.secretHash'),
      signOptions: {
        expiresIn: configService.get('auth.authLifetime'),
      },
    };
  },
  inject: [ConfigService],
};

@Module({
  imports:[
    UsersModule,
    JwtModule.registerAsync(jwtFactory)
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
