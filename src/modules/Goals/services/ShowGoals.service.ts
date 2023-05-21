import { inject, injectable } from 'tsyringe';
import { plainToInstance } from 'class-transformer';
import { AppError } from '@shared/error/AppError';
import { Goals } from '../entities/Goals';
import { IGoalsRepository } from '../repositories/GoalsRepository.interface';
import { IShowGoalsDTO } from './dto/ShowGoalsDTO';

@injectable()
class ShowGoalsService {
  constructor(
    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,
  ) {}

  public async execute({
    goal_id,
    isMaster,
    user_id,
  }: IShowGoalsDTO): Promise<Goals> {
    const goals = await this.goalsRepository.findBy({
      id: goal_id,
    });

    if (goals?.user_id !== user_id && !isMaster)
      throw new AppError('Você não tem permissão para acessar essa meta', 401);

    if (!goals) throw new AppError('Meta não encontrada', 404);

    if (goals.total_raised >= goals.value && !goals.finished) {
      goals.finished = true;
      await this.goalsRepository.save(goals);
    }
    if (goals.final_date < new Date() && !goals.finished) {
      goals.finished = true;
      await this.goalsRepository.save(goals);
    }

    return plainToInstance(Goals, goals);
  }
}

export { ShowGoalsService };
