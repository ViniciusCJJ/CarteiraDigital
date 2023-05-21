import { IPaginatedRequest } from 'src/shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from 'src/shared/interfaces/IPaginatedResponse';
import { Goals } from '@prisma/client';
import { IGoalsCreate } from './dto/GoalsRepositoryDTO';

interface IGoalsRepository {
  findBy(filter: Partial<Goals>): Promise<Goals | null>;
  listBy(filter: IPaginatedRequest<Goals>): Promise<IPaginatedResponse<Goals>>;
  listAll(filter: IPaginatedRequest<Goals>): Promise<IPaginatedResponse<Goals>>;
  create(goals: IGoalsCreate): Promise<Goals>;
  save(goals: Goals): Promise<Goals>;
  remove(goals: Goals): Promise<void>;
}

export { IGoalsRepository };
