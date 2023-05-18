import { TransactionsType } from '@prisma/client';

interface ITransactionsCreate {
  title: string;
  value: number;
  category?: string;
  type: TransactionsType;
  user_id: string;
}

export { ITransactionsCreate };
