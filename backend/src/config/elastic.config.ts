import { registerAs } from '@nestjs/config';

export default registerAs('elastic', () => ({
  node: process.env.ELASTICSEARCH_NODE,

  username: process.env.ELASTICSEARCH_USERNAME,

  password: process.env.ELASTICSEARCH_PASSWORD,

}));

