import {Injectable, UnauthorizedException} from '@nestjs/common';
import { LoginRequestDto } from "./dto/login-request.dto";
import { RegisterRequestDto } from './dto/register-request.dto';
import {HashService} from "../../core/hash/hash.service";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {SearchService} from "../../core/search/search.service";

@Injectable()
export class AuthService {

  constructor(
      protected hashService: HashService,
      protected usersService: UsersService,
      protected searchService: SearchService,
      private jwtService: JwtService

  ) {
  }

  async login(request: LoginRequestDto) {
    const user = await this.usersService.user(request.email);
    const passwordMatched = this.hashService.check(request.password, user.password)

    if (!user || !passwordMatched) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.jwtService.signAsync({id: user.id, name:user.name, email:user.email}),
    };
  }

  async register(request: RegisterRequestDto){
    const user = await this.usersService.createUser(request)
    await this.searchService.indexUser(user);

    return {
      access_token: await this.jwtService.signAsync({id: user.id, name:user.name, email:user.email}),
    };
  }
}
