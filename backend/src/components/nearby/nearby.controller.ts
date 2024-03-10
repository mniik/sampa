import {Body, Controller, Get, HttpCode, Post, UseGuards} from "@nestjs/common";
import {NearbyService} from "./nearby.service";
import {AuthGuard} from "../auth/guards/auth.guard";
import {Auth} from "../auth/auth.decorator";

@Controller('nearby')
export class NearbyController {

  constructor(
    protected nearbyService: NearbyService,
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  // @UseGuards(AuthGuard)
  async nearby(@Auth() user) {
    return this.nearbyService.findNearestUsers(user);
  }
}
