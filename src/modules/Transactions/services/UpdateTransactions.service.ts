import { AppError } from '@shared/error/AppError';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { Transactions } from '../entities/Transactions';
import { ITransactionsRepository } from '../repositories/TransactionsRepository.interface';
import { IUpdateTransactionsDTO } from './dto/UpdateTransactionsDTO';

@injectable()
class UpdateTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    user_id,
    transaction_id,
    ...transactionsParams
  }: IUpdateTransactionsDTO): Promise<Transactions> {
    const transactions = await this.transactionsRepository.findBy({
      id: transaction_id,
    });

    if (!transactions) throw new AppError('Transação não encontrado', 404);

    if (transactions?.user_id !== user_id) {
      throw new AppError(
        'Você não tem permissão para atualizar essa transação',
        401,
      );
    }

    Object.assign(transactions, transactionsParams);

    const newTransactions = await this.transactionsRepository.save(
      transactions,
    );

    return plainToInstance(Transactions, newTransactions);
  }
}

export { UpdateTransactionsService };
