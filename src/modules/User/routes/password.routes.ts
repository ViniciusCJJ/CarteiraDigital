import { Router } from 'express';

import { PasswordController } from '@modules/User/controllers/Password.controller';
import { verifyToken } from '@shared/middleware/verifyToken';
import {
  changePasswordMiddleware,
  forgotPasswordMiddleware,
} from './validators/password.validation';

const passwordRouter = Router();
const passwordController = new PasswordController();

passwordRouter.post(
  '/forgot',
  forgotPasswordMiddleware,
  passwordController.forgot,
);

passwordRouter.use(verifyToken);

passwordRouter.post(
  '/change/:user_id',
  changePasswordMiddleware,
  passwordController.change,
);

export { passwordRouter };
