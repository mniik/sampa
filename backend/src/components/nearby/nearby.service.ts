import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {ConfigService} from "@nestjs/config";
import {SearchService} from "../../core/search/search.service";

@Injectable()
export class NearbyService {

  constructor(
      protected usersService: UsersService,
      protected searchService: SearchService,
      protected configService: ConfigService

  ) {
  }

  async findNearestUsers(user) {
    const userModel = await this.usersService.user(user.email);
    const distance = this.configService.get('app.nearbyDistance')

    const query = {
          sort: [
            {
              _geo_distance: {
                location: {lon:userModel.longitude, lat:userModel.latitude },
                order: 'asc',
                unit: 'km',
              },
            },
          ],
          query: {
            bool: {
              filter: {
                geo_distance: {
                  distance: distance,
                  location: {lon:userModel.longitude, lat:userModel.latitude},
                },
              },
            },
          },
        };

    const result = await this.searchService.searchNearBy(query);

    return result.hits.hits


  }
}
