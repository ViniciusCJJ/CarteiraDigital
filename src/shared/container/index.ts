import { container } from 'tsyringe';

import './providers';

import { IUserRepository } from '@modules/User/repositories/UserRepository.interface';
import { UserRepository } from '@modules/User/repositories/UserRepository';
import { ITransactionsRepository } from '@modules/Transactions/repositories/TransactionsRepository.interface';
import { TransactionsRepository } from '@modules/Transactions/repositories/TransactionsRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);
