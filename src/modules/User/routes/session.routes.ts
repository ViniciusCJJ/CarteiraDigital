import { Router } from 'express';

import { SessionController } from '../controllers/Session.controller';
import {
  createSessionMiddleware,
  destroySessionMiddleware,
  refreshTokenMiddleware,
} from './validators/session.validation';

const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post('/', createSessionMiddleware, sessionController.create);

sessionRouter.put('/', refreshTokenMiddleware, sessionController.refresh);

sessionRouter.delete(
  '/:user_id',
  destroySessionMiddleware,
  sessionController.destroy,
);

export { sessionRouter };
