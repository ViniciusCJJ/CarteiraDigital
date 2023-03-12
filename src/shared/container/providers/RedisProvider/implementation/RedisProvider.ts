import Redis from 'ioredis';
import { singleton } from 'tsyringe';

import { redis } from '@config/redis';

import { ISetRedisDto } from '../dtos/ISetRedisDto';
import { IRedisProvider } from '../model/IRedisProvider';

@singleton()
export class RedisProvider implements IRedisProvider {
  private redis: Redis.Redis = new Redis(redis);

  public async get(key: string): Promise<string | undefined> {
    return (await this.redis.get(key)) || undefined;
  }

  public async set({
    key,
    value,
    time,
    option,
  }: ISetRedisDto): Promise<string> {
    await this.redis.set(key, value, option, time);
    return key;
  }

  public async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
