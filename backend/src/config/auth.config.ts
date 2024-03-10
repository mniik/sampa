import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({

  secretHash: process.env.SECRET_JWT_HASH,

  authLifetime: process.env.AUTH_LIFETIME || '2h',

}));
