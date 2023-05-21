import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Notifications } from '@prisma/client';
import { INotificationsCreate } from './dto/NotificationsRepositoryDTO';

interface INotificationsRepository {
  findBy(filter: Partial<Notifications>): Promise<Notifications | null>;
  listBy(
    filters: IPaginatedRequest<Notifications>,
  ): Promise<IPaginatedResponse<Notifications>>;
  create(notifications: INotificationsCreate): Promise<Notifications>;
  update(notifications: Notifications): Promise<Notifications>;
  remove(notifications: Notifications): Promise<void>;
}
export { INotificationsRepository };
