import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
  connect_timeout: 30000, // 30 seconds
});

redisClient.on('error', (err) => err);

redisClient.connect();

export default redisClient;
