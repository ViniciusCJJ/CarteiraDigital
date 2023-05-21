import { celebrate, Joi, Segments } from 'celebrate';

export const createGoalsMiddleware = celebrate({
  [Segments.BODY]: {
    title: Joi.string().required().label('Título'),
    value: Joi.number().required().positive().label('Valor'),
    final_date: Joi.date().required().label('Data final'),
  },
});

export const indexGoalsMiddleware = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(50),
    finished: Joi.boolean(),
  },
});

export const showGoalsMiddleware = celebrate({
  [Segments.PARAMS]: {
    goal_id: Joi.string().uuid().required(),
  },
});

export const updateGoalsMiddleware = celebrate({
  [Segments.PARAMS]: {
    goal_id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    title: Joi.string().label('Título'),
    value: Joi.number().positive().label('Valor'),
    final_date: Joi.date().label('Data final'),
    total_raised: Joi.number().positive().label('Valor arrecadado'),
  },
});

export const deleteGoalsMiddleware = celebrate({
  [Segments.PARAMS]: {
    goal_id: Joi.string().uuid().required(),
  },
});
