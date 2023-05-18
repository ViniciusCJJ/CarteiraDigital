import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Transactions } from '../entities/Transactions';
import { ITransactionsRepository } from '../repositories/TransactionsRepository.interface';

interface IIndexTransactionsDTO {
  paginatedRequest: IPaginatedRequest<Transactions>;
}

@injectable()
class IndexTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    paginatedRequest: { filters, limit, page },
  }: IIndexTransactionsDTO): Promise<IPaginatedResponse<Transactions>> {
    const response = await this.transactionsRepository.listBy({
      filters,
      page,
      limit,
    });

    return {
      results: plainToInstance(Transactions, response.results),
      page: response.page,
      limit: response.limit,
      total: response.total,
    };
  }
}

export { IndexTransactionsService };
