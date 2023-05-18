import { Transactions } from '@prisma/client';
import { prisma } from '@shared/database';
import { IPaginatedRequest } from 'src/shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from 'src/shared/interfaces/IPaginatedResponse';
import { ITransactionsCreate } from './dto/TransactionsRepositoryDTO';
import { ITransactionsRepository } from './TransactionsRepository.interface';

class TransactionsRepository implements ITransactionsRepository {
  async findBy(filter: Partial<Transactions>): Promise<Transactions | null> {
    const transaction = await prisma.transactions.findFirst({
      where: filter,
    });

    return transaction;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Transactions>): Promise<
    IPaginatedResponse<Transactions>
  > {
    const transactions = await prisma.transactions.findMany({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { created_at: 'desc' },
    });

    const transactionTotal = await prisma.transactions.count({
      where: filters,
    });

    return {
      results: transactions,
      total: transactionTotal,
      page,
      limit,
    };
  }

  public async listAll({
    filters,
  }: IPaginatedRequest<Transactions>): Promise<
    IPaginatedResponse<Transactions>
  > {
    const transactions = await prisma.transactions.findMany({
      where: filters,
      orderBy: { created_at: 'desc' },
    });

    const transactionTotal = await prisma.transactions.count({
      where: filters,
    });

    return {
      results: transactions,
      total: transactionTotal,
      page: 1,
      limit: transactionTotal,
    };
  }

  create({
    title,
    value,
    category,
    type,
    user_id,
  }: ITransactionsCreate): Promise<Transactions> {
    const transaction = prisma.transactions.create({
      data: { title, value, category, type, user_id },
    });

    return transaction;
  }

  async save(transaction: Transactions): Promise<Transactions> {
    const newTransactions = await prisma.transactions.update({
      where: { id: transaction.id },
      data: { ...transaction },
    });

    return newTransactions;
  }

  async remove(transaction: Transactions): Promise<void> {
    await prisma.transactions.delete({ where: { id: transaction.id } });
  }
}

export { TransactionsRepository };
