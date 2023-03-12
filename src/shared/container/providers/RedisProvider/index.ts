import { container } from 'tsyringe';
import { RedisProvider } from './implementation/RedisProvider';
import { IRedisProvider } from './model/IRedisProvider';

container.registerSingleton<IRedisProvider>('RedisProvider', RedisProvider);
