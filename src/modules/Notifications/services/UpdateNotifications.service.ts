import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { INotificationsRepository } from '../repositories/NotificationsRepositories.interface';
import { INotificationsUpdateDTO } from './dto/UpdateNotificationsDTO';

@injectable()
class UpdateNotificationsService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({ id, read }: INotificationsUpdateDTO): Promise<void> {
    const notifications = await this.notificationsRepository.findBy({ id });

    if (!notifications) {
      throw new AppError('Notificações não encontradas.', 404);
    }

    notifications.read = read;

    await this.notificationsRepository.update(notifications);
  }
}
export { UpdateNotificationsService };
