import { inject, injectable } from 'tsyringe';
import { plainToInstance } from 'class-transformer';
import { AppError } from '@shared/error/AppError';
import { Transactions } from '../entities/Transactions';
import { ITransactionsRepository } from '../repositories/TransactionsRepository.interface';
import { IShowTransactionsDTO } from './dto/ShowTransactionsDTO';

@injectable()
class ShowTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    transaction_id,
    isMaster,
    user_id,
  }: IShowTransactionsDTO): Promise<Transactions> {
    const transactions = await this.transactionsRepository.findBy({
      id: transaction_id,
    });

    if (transactions?.user_id !== user_id && !isMaster)
      throw new AppError(
        'Você não tem permissão para acessar essa transação',
        401,
      );

    if (!transactions) throw new AppError('Transação não encontrada', 404);

    return plainToInstance(Transactions, transactions);
  }
}

export { ShowTransactionsService };
