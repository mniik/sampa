import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { User, Prisma } from '@prisma/client';
import {HashService} from "../../core/hash/hash.service";


@Injectable()
export class UsersService {

    constructor(
        protected prismaService: PrismaService,
        protected hashService: HashService,
    ) {
    }

    async user(email: string): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: {email},
        });
    }

    async createUser(request): Promise<User> {
        const data = {
            name: request.name ?? '',
            bio: request.bio ?? '',
            email:request.email,
            latitude:  request.location.latitude,
            longitude: request.location.longitude,
            password: this.hashService.make(request.password),
        };

        return this.prismaService.user.create({
            data:{
                ...data,
                avatars: {
                    createMany:{
                        data: request.avatars.map(avatar => ({ url:avatar}))
                    }
                }
            },
            include: {
                avatars: true,
            },
        });
    }
}
