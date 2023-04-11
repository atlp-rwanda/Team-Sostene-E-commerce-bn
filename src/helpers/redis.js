import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL,
  maxRetriesPerRequest: 5,
  connect_timeout: 30000, // 30 seconds
});

redisClient.connect();

export default redisClient;
