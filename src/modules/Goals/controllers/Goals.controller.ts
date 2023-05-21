import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateGoalsService } from '../services/CreateGoals.service';
import { DeleteGoalsService } from '../services/DeleteGoals.service';
import { IndexGoalsService } from '../services/IndexGoals.service';
import { ShowGoalsService } from '../services/ShowGoals.service';
import { UpdateGoalsService } from '../services/UpdateGoals.service';

class GoalsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { title, value, final_date } = req.body;
    const { id: request_id } = req.user;

    const createGoalsService = container.resolve(CreateGoalsService);
    const Goals = await createGoalsService.execute({
      title,
      value,
      final_date,
      user_id: request_id,
    });

    return res.status(201).json(Goals);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { isMaster, id: request_id } = req.user;
    const { goal_id } = req.params;

    const showGoalsService = container.resolve(ShowGoalsService);

    const Goals = await showGoalsService.execute({
      goal_id,
      isMaster,
      user_id: request_id,
    });
    return res.json(instanceToInstance(Goals));
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { limit, page, ...filters } = req.query;

    const indexGoalsService = container.resolve(IndexGoalsService);
    Object.assign(filters, { user_id: req.user.id });

    if (req.user.isMaster) {
      delete filters.user_id;
    }

    const user = await indexGoalsService.execute({
      paginatedRequest: {
        filters,
        limit: limit ? Number(limit) : undefined,
        page: page ? Number(page) : undefined,
      },
    });
    return res.json(instanceToInstance(user));
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { goal_id } = req.params;
    const { title, value, final_date, total_raised } = req.body;

    const updateGoalsService = container.resolve(UpdateGoalsService);

    const Goals = await updateGoalsService.execute({
      title,
      value,
      final_date,
      total_raised,
      user_id: id,
      goal_id,
    });

    return res.json(Goals);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { goal_id } = req.params;
    const { id, isMaster } = req.user;

    const deleteGoalsService = container.resolve(DeleteGoalsService);

    await deleteGoalsService.execute({
      goal_id,
      user_id: id,
      isMaster,
    });

    return res.status(204).send();
  }
}

export { GoalsController };
