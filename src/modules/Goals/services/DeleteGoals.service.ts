import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import { IGoalsRepository } from '../repositories/GoalsRepository.interface';
import { IDeleteGoalsDTO } from './dto/DeleteGoalsDTO';

@injectable()
class DeleteGoalsService {
  constructor(
    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,
  ) {}

  public async execute({ goal_id }: IDeleteGoalsDTO): Promise<void> {
    const goals = await this.goalsRepository.findBy({
      id: goal_id,
    });

    if (!goals) throw new AppError('Meta não encontrada', 404);

    await this.goalsRepository.remove(goals);
  }
}

export { DeleteGoalsService };
