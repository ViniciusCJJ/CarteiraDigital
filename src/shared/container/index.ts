import { container } from 'tsyringe';

import './providers';

import { IUserRepository } from '@modules/User/repositories/UserRepository.interface';
import { UserRepository } from '@modules/User/repositories/UserRepository';
import { ITransactionsRepository } from '@modules/Transactions/repositories/TransactionsRepository.interface';
import { TransactionsRepository } from '@modules/Transactions/repositories/TransactionsRepository';
import { IGoalsRepository } from '@modules/Goals/repositories/GoalsRepository.interface';
import { GoalsRepository } from '@modules/Goals/repositories/GoalsRepository';
import { NotificationsRepository } from '@modules/Notifications/repositories/NotificationsRepository';
import { INotificationsRepository } from '@modules/Notifications/repositories/NotificationsRepositories.interface';
import { IEmailRepository } from '@modules/User/repositories/EmailRepository.interface';
import { EmailRepository } from '@modules/User/repositories/EmailRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);

container.registerSingleton<IGoalsRepository>(
  'GoalsRepository',
  GoalsRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IEmailRepository>(
  'EmailRepository',
  EmailRepository,
);
