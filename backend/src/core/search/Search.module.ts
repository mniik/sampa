import {Global, Module, OnModuleInit} from '@nestjs/common';
import {ElasticsearchModule, ElasticsearchService} from "@nestjs/elasticsearch";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {SearchService} from "./search.service";

@Global()
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('elastic.node'),
        auth: {
          username: configService.get('elastic.username'),
          password: configService.get('elastic.password'),
        }
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    //
  ],
  providers: [
    SearchService,
  ],
  exports: [
    SearchService,
  ],
})
export class SearchModule  {
}
