import { User } from '@prisma/client';
import { IPaginatedRequest } from 'src/shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from 'src/shared/interfaces/IPaginatedResponse';
import { IUserCreate } from './dto/UserRepositoryDTO';

interface IUserRepository {
  findBy(filter: Partial<User>): Promise<User | null>;
  listBy(filter: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>>;
  create(user: IUserCreate): Promise<User>;
  update(user: User): Promise<User>;
  remove(user: User): Promise<void>;
}

export { IUserRepository };
