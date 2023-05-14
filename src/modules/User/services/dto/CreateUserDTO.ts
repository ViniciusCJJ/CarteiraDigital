import { UserRole } from '@prisma/client';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birth_date: Date;
  role?: UserRole;
}

export { ICreateUserDTO };
