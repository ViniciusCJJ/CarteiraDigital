import { celebrate, Joi, Segments } from 'celebrate';

export const forgotPasswordMiddleware = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

export const changePasswordMiddleware = celebrate({
  [Segments.BODY]: {
    new_password: Joi.string().required().min(8),
    old_password: Joi.string().required(),
  },
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
});
