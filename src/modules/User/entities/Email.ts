import { Email as IEmail, User } from '@prisma/client';

class Email implements IEmail {
  id: string;

  message: string;

  user_id: string;

  user: User;

  date_to_send: Date;

  created_at: Date;

  updated_at: Date;
}

export { Email };
