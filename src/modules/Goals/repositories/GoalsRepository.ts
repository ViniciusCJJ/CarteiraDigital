import { Goals } from '@prisma/client';
import { prisma } from '@shared/database';
import { IPaginatedRequest } from 'src/shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from 'src/shared/interfaces/IPaginatedResponse';
import { IGoalsCreate } from './dto/GoalsRepositoryDTO';
import { IGoalsRepository } from './GoalsRepository.interface';

class GoalsRepository implements IGoalsRepository {
  async findBy(filter: Partial<Goals>): Promise<Goals | null> {
    const goal = await prisma.goals.findFirst({
      where: filter,
    });

    return goal;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Goals>): Promise<IPaginatedResponse<Goals>> {
    const goals = await prisma.goals.findMany({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { created_at: 'desc' },
    });

    const goalTotal = await prisma.goals.count({
      where: filters,
    });

    return {
      results: goals,
      total: goalTotal,
      page,
      limit,
    };
  }

  public async listAll({
    filters,
  }: IPaginatedRequest<Goals>): Promise<IPaginatedResponse<Goals>> {
    const goals = await prisma.goals.findMany({
      where: filters,
      orderBy: { created_at: 'desc' },
    });

    const goalTotal = await prisma.goals.count({
      where: filters,
    });

    return {
      results: goals,
      total: goalTotal,
      page: 1,
      limit: goalTotal,
    };
  }

  create({ title, value, final_date, user_id }: IGoalsCreate): Promise<Goals> {
    const goal = prisma.goals.create({
      data: { title, value, final_date, user_id },
    });

    return goal;
  }

  async save(goal: Goals): Promise<Goals> {
    const newGoals = await prisma.goals.update({
      where: { id: goal.id },
      data: { ...goal },
    });

    return newGoals;
  }

  async remove(goal: Goals): Promise<void> {
    await prisma.goals.delete({ where: { id: goal.id } });
  }
}

export { GoalsRepository };
