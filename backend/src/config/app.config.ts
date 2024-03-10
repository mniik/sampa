import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  key: process.env.APP_KEY,

  port: parseInt(process.env.APP_PORT, 10) || 3001,

  url: process.env.APP_URL,

  timezone: process.env.APP_TIMEZONE || 'UTC',

  nearbyDistance: process.env.NEARBY_DISTANCE || '100km',
}));

