import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import { ITransactionsRepository } from '../repositories/TransactionsRepository.interface';
import { IDeleteTransactionsDTO } from './dto/DeleteTransactionsDTO';

@injectable()
class DeleteTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    transaction_id,
  }: IDeleteTransactionsDTO): Promise<void> {
    const transactions = await this.transactionsRepository.findBy({
      id: transaction_id,
    });

    if (!transactions) throw new AppError('Agendamento não encontrado', 404);

    await this.transactionsRepository.remove(transactions);
  }
}

export { DeleteTransactionsService };
