import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Notifications } from '@prisma/client';
import { INotificationsCreate } from './dto/NotificationsRepositoryDTO';
import { INotificationsRepository } from './NotificationsRepositories.interface';

class NotificationsRepository implements INotificationsRepository {
  async findBy(filter: Partial<Notifications>): Promise<Notifications | null> {
    const notification = await prisma.notifications.findFirst({
      where: filter,
    });

    return notification;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Notifications>): Promise<
    IPaginatedResponse<Notifications>
  > {
    const notifications = await prisma.notifications.findMany({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { created_at: 'desc' },
    });

    const notificationsTotal = await prisma.notifications.count({
      where: filters,
    });

    return {
      results: notifications,
      total: notificationsTotal,
      page,
      limit,
    };
  }

  public async show(id: string): Promise<Notifications | null> {
    const notification = await prisma.notifications.findFirst({
      where: { id },
    });

    return notification;
  }

  async create(data: INotificationsCreate): Promise<Notifications> {
    const notification = await prisma.notifications.create({
      data: {
        text: data.text,
        title: data.title,
        read: data.read,
        user_id: data.user_id,
        goal_id: data.goal_id,
      },
    });

    return notification;
  }

  public async update(notifications: Notifications): Promise<Notifications> {
    const newNotification = await prisma.notifications.update({
      where: { id: notifications.id },
      data: { ...notifications },
    });

    return newNotification;
  }

  public async remove(notifications: Notifications): Promise<void> {
    await prisma.notifications.delete({
      where: { id: notifications.id },
    });
  }
}
export { NotificationsRepository };
