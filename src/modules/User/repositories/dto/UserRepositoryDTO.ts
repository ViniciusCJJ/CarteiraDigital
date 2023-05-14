import { UserRole } from '@prisma/client';

interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  cpf: string;
  birth_date: Date;
  device_token?: string;
}

export { IUserCreate };
