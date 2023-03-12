import { User } from '@prisma/client';
import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { IUserCreate } from './dto/UserRepositoryDTO';
import { IUserRepository } from './UserRepository.interface';

class UserRepository implements IUserRepository {
  async findBy(filter: Partial<User>): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { ...filter },
    });

    return user;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>> {
    const users = await prisma.user.findMany({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const userTotal = await prisma.user.count({
      where: filters,
    });

    return {
      results: users,
      total: userTotal,
      page,
      limit,
    };
  }

  async create({ name, email, password, role }: IUserCreate): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });
    return user;
  }

  async update(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { ...user },
    });

    return updatedUser;
  }

  async remove(user: User): Promise<void> {
    await prisma.user.delete({
      where: { id: user.id },
    });
  }
}

export { UserRepository };
