import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { Notifications } from '../entities/Notifications';
import { INotificationsRepository } from '../repositories/NotificationsRepositories.interface';

@injectable()
class ListNotificationsService {
  constructor(
    @inject('NotificationsRepository')
    private notificationRepository: INotificationsRepository,
  ) {}

  public async execute({
    filters = {},
    page,
    limit,
  }: IPaginatedRequest<Notifications>): Promise<
    IPaginatedResponse<Notifications>
  > {
    const notifications = await this.notificationRepository.listBy({
      filters,
      page,
      limit,
    });

    return {
      results: notifications.results,
      total: notifications.total,
      page: notifications.page,
      limit: notifications.limit,
    };
  }
}
export { ListNotificationsService };
