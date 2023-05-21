import { TransactionsType } from '@prisma/client';

interface ITransactionsCreate {
  title: string;
  value: number;
  category?: string;
  type: TransactionsType;
  date?: Date;
  user_id: string;
}

export { ITransactionsCreate };
