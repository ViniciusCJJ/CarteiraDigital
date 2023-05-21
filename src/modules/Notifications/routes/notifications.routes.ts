import { verifyToken } from '@shared/middleware/verifyToken';
import { Router } from 'express';
import { NotificationsController } from '../controllers/Notifications.controller';

const notificationsRouter = Router();

const notificationsController = new NotificationsController();

notificationsRouter.use(verifyToken);

notificationsRouter.get('/', notificationsController.index);

notificationsRouter.put('/:notification_id', notificationsController.update);

export { notificationsRouter };
