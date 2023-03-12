import { container } from 'tsyringe';
import { HashProvider } from './implementation/HashProvider';
import { IHashProvider } from './model/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
