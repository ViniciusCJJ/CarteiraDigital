import { Roles } from '@shared/enum/Roles';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: Roles;
}

export { ICreateUserDTO };
