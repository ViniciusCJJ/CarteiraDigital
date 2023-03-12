import { UserRole } from '@prisma/client';

interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  device_token?: string;
}

export { IUserCreate };
