import { Exclude } from 'class-transformer';
import { User as IUser, UserRole } from '@prisma/client';

class User implements IUser {
  id: string;

  name: string;

  email: string;

  @Exclude()
  password: string;

  avatar: string | null;

  role: UserRole;

  device_token: string;

  cpf: string;

  birth_date: Date;

  created_at: Date;

  updated_at: Date;
}

export { User };
