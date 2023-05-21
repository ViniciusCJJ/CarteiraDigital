import { AppError } from '@shared/error/AppError';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { Goals } from '../entities/Goals';
import { IGoalsRepository } from '../repositories/GoalsRepository.interface';
import { IUpdateGoalsDTO } from './dto/UpdateGoalsDTO';

@injectable()
class UpdateGoalsService {
  constructor(
    @inject('GoalsRepository')
    private goalRepository: IGoalsRepository,
  ) {}

  public async execute({
    user_id,
    goal_id,
    total_raised,
    ...goalParams
  }: IUpdateGoalsDTO): Promise<Goals> {
    const goal = await this.goalRepository.findBy({
      id: goal_id,
    });

    if (!goal) throw new AppError('Meta não encontrado', 404);

    if (goal?.user_id !== user_id) {
      throw new AppError(
        'Você não tem permissão para atualizar essa Meta',
        401,
      );
    }

    if (total_raised) {
      goal.total_raised += total_raised;
    }

    if (goal.finished) {
      throw new AppError('Essa meta já foi finalizada', 401);
    }

    Object.assign(goal, goalParams);

    const newGoals = await this.goalRepository.save(goal);

    return plainToInstance(Goals, newGoals);
  }
}

export { UpdateGoalsService };
