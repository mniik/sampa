import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AuthConfig from "../../config/auth.config";

export const Auth = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const jwtService = new JwtService({secret:AuthConfig().secretHash});

        if (!request.headers.authorization) {
            return null;
        }

        const token = request.headers.authorization.split(' ')[1];

        const decoded = jwtService.decode(token, {complete:true});

        return decoded.payload;
    },
);