import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import { plainToInstance } from 'class-transformer';
import { ITransactionsRepository } from '@modules/Transactions/repositories/TransactionsRepository.interface';
import { Transactions } from '@prisma/client';
import { INotificationsRepository } from '@modules/Notifications/repositories/NotificationsRepositories.interface';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { User } from '../entities/User';
import { IShowUserDashboardDTO } from './dto/ShowUserDashboardDTO';

interface IShowUserDashboardResponse {
  user: User;
  balance: number;
  transactions: Transactions[];
}

@injectable()
class ShowUserDashboardService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    user_id,
  }: IShowUserDashboardDTO): Promise<IShowUserDashboardResponse> {
    const user = await this.userRepository.findBy({
      id: user_id,
    });
    if (!user) throw new AppError('Usuário não encontrado', 404);

    const transactions = await this.transactionsRepository.listAll({
      filters: { user_id },
    });

    const balance = transactions.results.reduce(
      (acc, transaction) =>
        transaction.type === 'Income'
          ? acc + transaction.value
          : acc - transaction.value,
      0,
    );

    if (balance < 0) {
      await this.notificationsRepository.create({
        title: 'Saldo negativo',
        text: `Seu saldo está negativo em R$ ${balance}`,
        user_id,
      });
    }

    return {
      user: plainToInstance(User, user),
      balance,
      transactions: transactions.results,
    };
  }
}

export { ShowUserDashboardService };
