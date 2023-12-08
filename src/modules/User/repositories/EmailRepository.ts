import { Email } from '@prisma/client';
import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Email as EntityEmail } from '../entities/Email';
import { IEmailCreate } from './dto/EmailRepositoryDTO';
import { IEmailRepository } from './EmailRepository.interface';

class EmailRepository implements IEmailRepository {
  async findBy(filter: Partial<Email>): Promise<Email | null> {
    const email = await prisma.email.findFirst({
      where: { ...filter },
    });

    return email;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
    initial_date,
    final_date,
  }: IPaginatedRequest<Email> & {
    initial_date: Date;
    final_date: Date;
  }): Promise<IPaginatedResponse<EntityEmail>> {
    const emails = await prisma.email.findMany({
      where: {
        date_to_send: {
          gte: initial_date,
          lte: final_date,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: true,
      },
    });

    console.log(emails);
    const emailTotal = await prisma.email.count({
      where: filters,
    });

    return {
      results: emails,
      total: emailTotal,
      page,
      limit,
    };
  }

  async create({ ...data }: IEmailCreate): Promise<Email> {
    const email = await prisma.email.create({
      data: {
        ...data,
      },
    });
    return email;
  }

  async update(email: Email): Promise<Email> {
    const updatedEmail = await prisma.email.update({
      where: { id: email.id },
      data: { ...email },
    });

    return updatedEmail;
  }

  async remove(email: Email): Promise<void> {
    await prisma.email.delete({
      where: { id: email.id },
    });
  }
}

export { EmailRepository };
