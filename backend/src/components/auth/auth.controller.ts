import {Body, Controller, Get, HttpCode, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequestDto } from "./dto/login-request.dto";
import {RegisterRequestDto} from "./dto/register-request.dto";

@Controller('auth')
export class AuthController {

  constructor(
    protected authService: AuthService,
  ) {
    //
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() request: LoginRequestDto) {
    return this.authService.login(request);
  }

  @Post('/register')
  @HttpCode(200)
  async register(@Body() request: RegisterRequestDto) {
    return this.authService.register(request);
  }
}
