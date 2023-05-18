import { TransactionsType } from '@prisma/client';

interface ICreateTransactionsDTO {
  title: string;
  value: number;
  category?: string;
  type: TransactionsType;
  user_id: string;
}

export { ICreateTransactionsDTO };