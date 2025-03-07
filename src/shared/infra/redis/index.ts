import Redis, { Redis as RedisClient } from 'ioredis';
import config from '@shared/environment';

class RedisConnection {
  private client: RedisClient;

  private uriConnection = `redis://${config.redis.host}:${config.redis.port}`;

  constructor() {
    if (config.app.env !== 'test') {
      this.client = new Redis(this.uriConnection);
    }
  }

  async connect(): Promise<RedisClient> {
    return new Promise((resolve, reject) => {
      this.client.on('ready', () => resolve(this.client));
      this.client.on('error', (err) => reject(err));
    });
  }

  getClient(): RedisClient {
    return this.client;
  }

  async disconnect(): Promise<void> {
    await this.client.quit();
  }
}

export default new RedisConnection();
