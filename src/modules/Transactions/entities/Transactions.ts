import {
  Transactions as ITransactions,
  TransactionsType,
} from '@prisma/client';

class Transactions implements ITransactions {
  id: string;

  title: string;

  value: number;

  category: string | null;

  type: TransactionsType;

  user_id: string;

  created_at: Date;

  updated_at: Date;
}

export { Transactions };
