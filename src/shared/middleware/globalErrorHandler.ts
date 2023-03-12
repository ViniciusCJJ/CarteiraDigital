/* eslint-disable  @typescript-eslint/no-explicit-any */
import { CelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

import { logger } from '@config/winston';
import { AppError } from '../error/AppError';

export async function globalErrorHandler(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Promise<Response<any>> {
  const ip = request.headers['x-forwarded-for'] || request.ip;
  if (err instanceof AppError) {
    logger.error(
      `${err.statusCode} - ${err.message} - ${request.originalUrl} - ${
        request.method
      } - ${ip} - body: ${JSON.stringify(
        request.body,
      )} - params: ${JSON.stringify(request.params)} - query: ${JSON.stringify(
        request.query,
      )} - user: ${JSON.stringify(request.user)} - date: ${new Date()}`,
    );

    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof CelebrateError) {
    logger.error(
      `${400} - ${err.details.values().next().value.details[0].message} - ${
        request.originalUrl
      } - ${request.method} - ${ip} - body: ${JSON.stringify(
        request.body,
      )} - params: ${JSON.stringify(request.params)} - query: ${JSON.stringify(
        request.query,
      )} - user: ${JSON.stringify(request.user)} - date: ${new Date()}`,
    );

    let messageString;
    const { type, context } = err.details.values().next().value.details[0];

    switch (type) {
      case 'any.required':
        messageString = `O campo ${context.label} é obrigatório.`;
        break;
      case 'string.base':
        messageString = `O campo ${context.label} deve ser do tipo texto.`;
        break;
      case 'string.empty':
        messageString = `O campo ${context.label} não pode ser um texto vazio.`;
        break;
      case 'string.min':
        messageString = `O campo ${context.label} não pode ser menor que ${context.limit} caracteres.`;
        break;
      case 'string.max':
        messageString = `O campo ${context.label} não pode ser maior que ${context.limit} caracteres.`;
        break;
      case 'string.email':
        messageString = `O campo ${context.label} deve ser um email válido.`;
        break;
      case 'number.base':
        messageString = `O campo ${context.label} deve ser do tipo número.`;
        break;
      case 'number.min':
        messageString = `O campo ${context.label} não pode ser menor que ${context.limit}.`;
        break;
      case 'number.max':
        messageString = `O campo ${context.label} não pode ser maior que ${context.limit}.`;
        break;
      case 'array.base':
        messageString = `O campo ${context.label} deve ser do tipo array.`;
        break;
      case 'array.empty':
        messageString = `O campo ${context.label} não pode ser vazio.`;
        break;
      case 'array.min':
        messageString = `O campo ${context.label} não pode ter um tamanho menor que ${context.limit}.`;
        break;
      case 'array.max':
        messageString = `O campo ${context.label} não pode ter um tamanho maior que ${context.limit}.`;
        break;
      case 'string.length':
        messageString = `O campo ${context.label} deve ter ${context.limit} caracteres.`;
        break;
      case 'document.cnpj':
        messageString = `O CNPJ é inválido.`;
        break;
      case 'document.cpf':
        messageString = `O CPF é inválido.`;
        break;
      default:
        messageString = 'Aconteceu um erro tente novamente mais tarde.';
        break;
    }

    return response.status(400).json({
      status: 'error',
      message: messageString,
    });
  }

  logger.error(
    `${500} - ${err.message} - ${request.originalUrl} - ${
      request.method
    } - ${ip} - body: ${JSON.stringify(
      request.body,
    )} - params: ${JSON.stringify(request.params)} - query: ${JSON.stringify(
      request.query,
    )} - user: ${JSON.stringify(request.user)} - date: ${new Date()}`,
  );

  return response.status(500).json({
    status: 'error',
    message: 'Server error',
  });
}
