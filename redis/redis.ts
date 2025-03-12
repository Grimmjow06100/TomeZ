
import { createClient } from 'redis';

export const redisClient = createClient({
    username: 'default',
    password: 'B2WuOTfAX5l7EkPjWiFgnYM7h5v1praZ',
    socket: {
        host: 'redis-12534.c339.eu-west-3-1.ec2.redns.redis-cloud.com',
        port: 12534
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();

await redisClient.set('foo', 'bar');
const result = await redisClient.get('foo');
console.log(result)  // >>> bar

