import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.connect();

export default redisClient;
