import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Transactions } from '../entities/Transactions';
import { ITransactionsRepository } from '../repositories/TransactionsRepository.interface';
import { ICreateTransactionsDTO } from './dto/CreateTransactionsDTO';

@injectable()
class CreateTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository, // @inject('NotificationsRepository') // private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    title,
    value,
    type,
    category,
    user_id,
  }: ICreateTransactionsDTO): Promise<Transactions> {
    const transactions = await this.transactionsRepository.create({
      title,
      value,
      type,
      category,
      user_id,
    });

    await this.transactionsRepository.save(transactions);

    return plainToInstance(Transactions, transactions);
  }
}

export { CreateTransactionsService };
