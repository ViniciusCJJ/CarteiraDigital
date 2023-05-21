import { Router, Request, Response, NextFunction } from 'express';

import { userRouter } from '@modules/User/routes/user.routes';
import { transactionsRouter } from '@modules/Transactions/routes/transactions.routes';
import { goalsRouter } from '@modules/Goals/routes/goal.routes';
import { notificationsRouter } from '@modules/Notifications/routes/notifications.routes';

const router = Router();

router.use('/user', userRouter);

router.use('/transactions', transactionsRouter);

router.use('/goals', goalsRouter);

router.use('/notifications', notificationsRouter);

router.get('/', (request: Request, response: Response) =>
  response.send('Carteira Digital - 0.0.1'),
);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route)
    return response.status(404).send(`${request.url} não encontrado`);
  return next();
});

export { router };
