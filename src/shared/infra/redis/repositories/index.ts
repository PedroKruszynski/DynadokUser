import RedisConnection from '@shared/infra/redis';
import Redis from 'ioredis';
import config from '@shared/environment';
import IRedisBaseRepository from '../entities';

export default class RedisBaseRepository implements IRedisBaseRepository {
  private client: Redis

  constructor() {
    if (config.app.env !== 'test') {
      this.client = RedisConnection.getClient();
    }
  }

  async save(key: string, value: any): Promise<'OK'> {
    return this.client.set(key, value);
  }

  async recover(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async invalidate(key: string): Promise<number> {
    return this.client.del(key);
  }
}
