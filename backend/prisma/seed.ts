import { PrismaClient } from '@prisma/client'
import {ElasticsearchService} from "@nestjs/elasticsearch";
import ElasticConfig from "../src/config/elastic.config";
const prisma = new PrismaClient()
async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'alice@prisma.io',
            name: 'Alice',
            bio: 'msadsan',
            password: 'asdsad',
            latitude: 41.11,
            longitude: 41.12,
            avatars: {
                create: {
                    url: 'https://www.prisma.io/nextjs',
                },
            },
        },
    })
    const bob = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
            email: 'bob@prisma.io',
            name: 'Bob',
            bio: 'asdsa',
            password: 'asdsad',
            latitude: 41.12,
            longitude: 41.13,
            avatars: {
                create: [
                    {
                        url: 'https://twitter.com/prisma',
                    },
                    {
                        url: 'https://twitter.com/nexusgql',
                    },
                ],
            },
        },
    })

    const daniel = await prisma.user.upsert({
        where: { email: 'daniel@prisma.io' },
        update: {},
        create: {
            email: 'daniel@prisma.io',
            name: 'daniel',
            bio: 'daniel daniel',
            password: 'daniel ',
            latitude: 41.02,
            longitude: 41.02,
            avatars: {
                create: [
                    {
                        url: 'https://twitter.com/prisma',
                    },
                    {
                        url: 'https://twitter.com/nexusgql',
                    },
                ],
            },
        },
    })

    const terry = await prisma.user.upsert({
        where: { email: 'terry@prisma.io' },
        update: {},
        create: {
            email: 'terry@prisma.io',
            name: 'terry',
            bio: 'terry terry',
            password: 'terry terry',
            latitude: 41.04,
            longitude: 41.03,
            avatars: {
                create: [
                    {
                        url: 'https://twitter.com/prisma',
                    },
                    {
                        url: 'https://twitter.com/nexusgql',
                    },
                ],
            },
        },
    })

    const susan = await prisma.user.upsert({
        where: { email: 'susan@prisma.io' },
        update: {},
        create: {
            email: 'susan@prisma.io',
            name: 'susan',
            bio: 'susan susan',
            password: 'susan susan',
            latitude: 41.06,
            longitude: 41.05,
            avatars: {
                create: [
                    {
                        url: 'https://twitter.com/prisma',
                    },
                    {
                        url: 'https://twitter.com/nexusgql',
                    },
                ],
            },
        },
    })

    const sara = await prisma.user.upsert({
        where: { email: 'sara@prisma.io' },
        update: {},
        create: {
            email: 'sara@prisma.io',
            name: 'sara',
            bio: 'sara sara',
            password: 'sara',
            latitude: 41.07,
            longitude: 41.06,
            avatars: {
                create: [
                    {
                        url: 'https://twitter.com/prisma',
                    },
                    {
                        url: 'https://twitter.com/nexusgql',
                    },
                ],
            },
        },
    })

    const brad = await prisma.user.upsert({
        where: { email: 'brad@prisma.io' },
        update: {},
        create: {
            email: 'brad@prisma.io',
            name: 'brad',
            bio: 'brad brad',
            password: 'brad',
            latitude: 41.09,
            longitude: 41.08,
            avatars: {
                create: [
                    {
                        url: 'https://twitter.com/prisma',
                    },
                    {
                        url: 'https://twitter.com/nexusgql',
                    },
                ],
            },
        },
    })

    const john = await prisma.user.upsert({
        where: { email: 'john@prisma.io' },
        update: {},
        create: {
            email: 'john@prisma.io',
            name: 'john',
            bio: 'john john',
            password: 'john john',
            latitude: 41.10,
            longitude: 41.09,
            avatars: {
                create: [
                    {
                        url: 'https://twitter.com/prisma',
                    },
                    {
                        url: 'https://twitter.com/nexusgql',
                    },
                ],
            },
        },
    })

    const users = await prisma.user.findMany();
    const elasticsearchService = new ElasticsearchService({
        node: ElasticConfig().node,
        auth: {
            username: ElasticConfig().username,
            password: ElasticConfig().password,
        }
    });

    const exists = await elasticsearchService.indices.exists({ index: 'users' });

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

    // Index each user
    for (const user of users) {
        await elasticsearchService.index({
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



}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })