import { INotificationsRepository } from '@modules/Notifications/repositories/NotificationsRepositories.interface';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Goals } from '../entities/Goals';
import { IGoalsRepository } from '../repositories/GoalsRepository.interface';

interface IIndexGoalsDTO {
  paginatedRequest: IPaginatedRequest<Goals>;
}

@injectable()
class IndexGoalsService {
  constructor(
    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    paginatedRequest: { filters, limit, page },
  }: IIndexGoalsDTO): Promise<IPaginatedResponse<Goals>> {
    const response = await this.goalsRepository.listBy({
      filters,
      page,
      limit,
    });

    response.results.forEach(async goal => {
      if (goal.total_raised >= goal.value && !goal.finished) {
        goal.finished = true;
        await this.goalsRepository.save(goal);

        const notificationExists = await this.notificationsRepository.findBy({
          goal_id: goal.id,
        });

        if (!notificationExists) {
          this.notificationsRepository.create({
            user_id: goal.user_id,
            title: 'Meta finalizada',
            text: `A meta ${goal.title} foi finalizada com sucesso`,
            goal_id: goal.id,
          });
        }
      }
      if (goal.final_date < new Date() && !goal.finished) {
        goal.finished = true;
        await this.goalsRepository.save(goal);

        const notificationExists = await this.notificationsRepository.findBy({
          goal_id: goal.id,
        });

        if (!notificationExists) {
          this.notificationsRepository.create({
            user_id: goal.user_id,
            title: 'Meta finalizada',
            text: `A meta ${goal.title} chegou ao fim `,
            goal_id: goal.id,
          });
        }
      }
    });

    return {
      results: plainToInstance(Goals, response.results),
      page: response.page,
      limit: response.limit,
      total: response.total,
    };
  }
}

export { IndexGoalsService };
