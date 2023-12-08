import { Email } from '@prisma/client';
import { IPaginatedRequest } from 'src/shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from 'src/shared/interfaces/IPaginatedResponse';
import { Email as EntityEmail } from '../entities/Email';
import { IEmailCreate } from './dto/EmailRepositoryDTO';

interface IEmailRepository {
  findBy(filter: Partial<Email>): Promise<Email | null>;
  listBy(
    filter: IPaginatedRequest<Email> & {
      initial_date?: Date;
      final_date?: Date;
    },
  ): Promise<IPaginatedResponse<EntityEmail>>;
  create(email: IEmailCreate): Promise<Email>;
  update(email: Email): Promise<Email>;
  remove(email: Email): Promise<void>;
}

export { IEmailRepository };
