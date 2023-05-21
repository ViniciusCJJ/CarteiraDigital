import { Router } from 'express';

import { verifyToken } from '@shared/middleware/verifyToken';
import { GoalsController } from '../controllers/Goals.controller';
import {
  createGoalsMiddleware,
  deleteGoalsMiddleware,
  showGoalsMiddleware,
  updateGoalsMiddleware,
  indexGoalsMiddleware,
} from './validators/goals.validation';

const goalsRouter = Router();

const goalsController = new GoalsController();

goalsRouter.use(verifyToken);

goalsRouter.post('/', createGoalsMiddleware, goalsController.create);

goalsRouter.put('/:goal_id', updateGoalsMiddleware, goalsController.update);

goalsRouter.get('/:goal_id', showGoalsMiddleware, goalsController.show);

goalsRouter.get('/', indexGoalsMiddleware, goalsController.index);

goalsRouter.delete('/:goal_id', deleteGoalsMiddleware, goalsController.delete);

export { goalsRouter };
