import { Goals as IGoals } from '@prisma/client';

class Goals implements IGoals {
  id: string;

  title: string;

  value: number;

  total_raised: number;

  finished: boolean;

  final_date: Date;

  user_id: string;

  created_at: Date;

  updated_at: Date;
}

export { Goals };
