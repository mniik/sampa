import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import {ElasticsearchService} from "@nestjs/elasticsearch";


@Injectable()
export class SearchService {
    constructor(
        protected elasticsearchService: ElasticsearchService,
    ) {
        //
    }

    async createIndex() {
        const exists = await this.elasticsearchService.indices.exists({ index: 'users' });
        if(!exists){
            return this.elasticsearchService.indices.create({
                index: 'users',
                body: {
                    mappings: {
                        properties: {
                            location: { type: 'geo_point' },
                        },
                    },
                },
            });
        }
    }

    async indexUser(user) {
        await this.createIndex()
        return this.elasticsearchService.index({
            index: 'users',
            id: user.id.toString(),
            body: {
                name: user.name,
                email: user.email,
                location: {
                    lat: user.latitude,
                    lon: user.longitude,
                },
            },
        });
    }

    searchNearBy(query) {
        const result =  this.elasticsearchService.search({
            index: 'users',
            body: query
        });
        return result;
    }
}
