import { IPaginatedRequest } from 'src/shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from 'src/shared/interfaces/IPaginatedResponse';
import { Transactions } from '@prisma/client';
import { ITransactionsCreate } from './dto/TransactionsRepositoryDTO';

interface ITransactionsRepository {
  findBy(filter: Partial<Transactions>): Promise<Transactions | null>;
  listBy(
    filter: IPaginatedRequest<Transactions>,
  ): Promise<IPaginatedResponse<Transactions>>;
  listAll(
    filter: IPaginatedRequest<Transactions>,
  ): Promise<IPaginatedResponse<Transactions>>;
  create(transactions: ITransactionsCreate): Promise<Transactions>;
  save(transactions: Transactions): Promise<Transactions>;
  remove(transactions: Transactions): Promise<void>;
}

export { ITransactionsRepository };
