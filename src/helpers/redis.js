/* eslint-disable no-console */
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.REDIS_URL; // redis external url acquired from render
const redisClient = createClient({
  url
});
redisClient.connect().catch(console.error);

redisClient.on('connect', () => {
  console.log('******* Connected to Redis server **********');
});
redisClient.on('error', (error) => {
  console.error('*********** Error connecting to Redis server ***********', error);
});

// eslint-disable-next-line require-jsdoc
async function t() {
  const f = await redisClient.KEYS('*');
  console.log(f);
}

t();
export default redisClient;
