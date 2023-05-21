import { v4 as uuidV4 } from 'uuid';
import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';

import { AppError } from '@shared/error/AppError';
import { IRedisProvider } from '@shared/container/providers/RedisProvider/model/IRedisProvider';
import { refreshToken_config } from '@config/auth';
import { jwtGenerate } from '@shared/util/jwtGenerate';
import { UserRole } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { ITransactionsRepository } from '@modules/Transactions/repositories/TransactionsRepository.interface';
import { INotificationsRepository } from '@modules/Notifications/repositories/NotificationsRepositories.interface';
import { IGoalsRepository } from '@modules/Goals/repositories/GoalsRepository.interface';
import { dateDiff } from '@shared/util/dateDiff';
import { IUserRepository } from '../repositories/UserRepository.interface';
import {
  ICreateSessionDTO,
  ICreateSessionResponseDTO,
} from './dto/CreateSessionDTO';
import { User } from '../entities/User';

@injectable()
class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,

    @inject('RedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  public async execute({
    email,
    password,
    device_token,
    remember_me = false,
  }: ICreateSessionDTO): Promise<ICreateSessionResponseDTO> {
    const user = await this.userRepository.findBy({ email });

    if (!user) throw new AppError('Email ou senha inválidos', 404);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new AppError('Email ou senha inválidos', 401);

    const jwToken = jwtGenerate(user.id, user.role === UserRole.Master);

    const refreshToken = remember_me ? uuidV4() : undefined;

    if (refreshToken) {
      await this.redisProvider.set({
        key: `${refreshToken_config.prefix}${refreshToken}`,
        value: user.id,
        time: refreshToken_config.expiresIn,
        option: 'EX',
      });
    }

    if (device_token) {
      user.device_token = device_token;

      await this.userRepository.update(user);
    }

    user.avatar = `${process.env.APP_API_URL}files/${user.avatar}`;

    const transactions = await this.transactionsRepository.listAll({
      filters: { user_id: user.id },
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
        user_id: user.id,
      });
    }

    const goals = await this.goalsRepository.listAll({
      filters: { user_id: user.id },
    });
    goals.results.forEach(async goal => {
      const now = new Date();
      const diff = dateDiff(goal.final_date, now);
      if (diff <= 7) {
        const alreadyNotified = await this.notificationsRepository.findBy({
          goal_id: goal.id,
        });

        if (!alreadyNotified) {
          this.notificationsRepository.create({
            title: 'Meta próxima do fim',
            text: `Sua meta ${goal.title} está próxima do fim, faltam: R$ ${
              goal.value - goal.total_raised
            } para arrecadar`,
            goal_id: goal.id,
            user_id: user.id,
          });
        }
      }
    });

    return {
      user: plainToInstance(User, user),
      access_token: jwToken,
      refresh_token: refreshToken,
    };
  }
}

export { CreateSessionService };
