import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Goals } from '../entities/Goals';
import { IGoalsRepository } from '../repositories/GoalsRepository.interface';
import { ICreateGoalsDTO } from './dto/CreateGoalsDTO';

@injectable()
class CreateGoalsService {
  constructor(
    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository, // @inject('NotificationsRepository') // private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    title,
    value,
    final_date,
    user_id,
  }: ICreateGoalsDTO): Promise<Goals> {
    const goals = await this.goalsRepository.create({
      title,
      value,
      final_date,
      user_id,
    });

    await this.goalsRepository.save(goals);

    return plainToInstance(Goals, goals);
  }
}

export { CreateGoalsService };
