import { celebrate, Joi, Segments } from 'celebrate';

export const createTransactionsMiddleware = celebrate({
  [Segments.BODY]: {
    title: Joi.string().required().label('Título'),
    value: Joi.number().required().positive().label('Valor'),
    type: Joi.string().required().valid('Income', 'Outcome').label('Tipo'),
    category: Joi.string().label('Categoria').empty(''),
  },
});

export const indexTransactionsMiddleware = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(50),
    category: Joi.string().label('Categoria').empty(''),
    type: Joi.string().valid('Income', 'Outcome').label('Tipo').empty(''),
  },
});

export const showTransactionsMiddleware = celebrate({
  [Segments.PARAMS]: {
    transaction_id: Joi.string().uuid().required(),
  },
});

export const updateTransactionsMiddleware = celebrate({
  [Segments.PARAMS]: {
    transaction_id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    title: Joi.string().label('Título'),
    value: Joi.number().positive().label('Valor'),
    type: Joi.string().valid('Income', 'Outcome').label('Tipo'),
    category: Joi.string().label('Categoria').empty(''),
  },
});

export const deleteTransactionsMiddleware = celebrate({
  [Segments.PARAMS]: {
    transaction_id: Joi.string().uuid().required(),
  },
});
