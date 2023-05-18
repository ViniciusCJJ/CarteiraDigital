import { Router } from 'express';

import { verifyToken } from '@shared/middleware/verifyToken';
import { TransactionsController } from '../controllers/Transaction.controller';
import {
  createTransactionsMiddleware,
  deleteTransactionsMiddleware,
  showTransactionsMiddleware,
  updateTransactionsMiddleware,
  indexTransactionsMiddleware,
} from './validators/transactions.validation';

const transactionsRouter = Router();

const transactionsController = new TransactionsController();

transactionsRouter.use(verifyToken);

transactionsRouter.post(
  '/',
  createTransactionsMiddleware,
  transactionsController.create,
);

transactionsRouter.put(
  '/:transaction_id',
  updateTransactionsMiddleware,
  transactionsController.update,
);

transactionsRouter.get(
  '/:transaction_id',
  showTransactionsMiddleware,
  transactionsController.show,
);

transactionsRouter.get(
  '/',
  indexTransactionsMiddleware,
  transactionsController.index,
);

transactionsRouter.delete(
  '/:transaction_id',
  deleteTransactionsMiddleware,
  transactionsController.delete,
);

export { transactionsRouter };
