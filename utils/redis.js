import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.status = true;
    this.client.on('error', (err) => {
      console.log(`${err.message}`);
      this.status = false;
    });
    this.client.on('connect', () => {
      this.status = true;
    });
  }

  isAlive() {
    return this.status;
  }

  async get(key) {
    const getVal = await promisify(this.client.GET).bind(this.client)(key);
    return getVal;
  }

  async set(key, value, duration) {
    const setVal = await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
    return setVal;
  }

  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
