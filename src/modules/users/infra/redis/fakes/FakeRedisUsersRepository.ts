import RedisBaseRepository from '@shared/infra/redis/repositories';

export default class FakeRedisUsersRepository extends RedisBaseRepository {
  private cache: Record<string, string> = {};

  constructor() {
    super()
  }

  async save(key: string, value: any): Promise<'OK'> {
    this.cache[key] = value
    return 'OK'
  }

  async invalidate(key: string): Promise<number> {
    delete this.cache[key]
    return 1
  }

  async recover(key: string): Promise<string | null> {
    const exist = this.cache[key]

    if (exist) {
      return exist
    }

    return null
  }
}
