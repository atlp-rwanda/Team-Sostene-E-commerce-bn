import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
  maxRetriesPerRequest: 5,
});

redisClient.connect();

export default redisClient;
