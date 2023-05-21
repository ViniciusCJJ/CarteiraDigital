import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTransactionsService } from '../services/CreateTransactions.service';
import { DeleteTransactionsService } from '../services/DeleteTransactions.service';
import { IndexTransactionsService } from '../services/IndexTransactions.service';
import { ShowTransactionsService } from '../services/ShowTransactions.service';
import { UpdateTransactionsService } from '../services/UpdateTransactions.service';

class TransactionsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { title, value, category, type, date } = req.body;
    const { id: request_id } = req.user;

    const createTransactionsService = container.resolve(
      CreateTransactionsService,
    );
    const transactions = await createTransactionsService.execute({
      title,
      value,
      category,
      type,
      date,
      user_id: request_id,
    });

    return res.status(201).json(transactions);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { isMaster, id: request_id } = req.user;
    const { transaction_id } = req.params;

    const showTransactionsService = container.resolve(ShowTransactionsService);

    const transactions = await showTransactionsService.execute({
      transaction_id,
      isMaster,
      user_id: request_id,
    });
    return res.json(instanceToInstance(transactions));
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { limit, page, ...filters } = req.query;

    const indexTransactionsService = container.resolve(
      IndexTransactionsService,
    );
    Object.assign(filters, { user_id: req.user.id });

    if (req.user.isMaster) {
      delete filters.user_id;
    }

    const user = await indexTransactionsService.execute({
      paginatedRequest: {
        filters,
        limit: limit ? Number(limit) : undefined,
        page: page ? Number(page) : undefined,
      },
    });
    return res.json(instanceToInstance(user));
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { transaction_id } = req.params;
    const { title, value, category, type, date } = req.body;

    const updateTransactionsService = container.resolve(
      UpdateTransactionsService,
    );

    const transactions = await updateTransactionsService.execute({
      title,
      value,
      category,
      type,
      date,
      user_id: id,
      transaction_id,
    });

    return res.json(transactions);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { transaction_id } = req.params;
    const { id, isMaster } = req.user;

    const deleteTransactionsService = container.resolve(
      DeleteTransactionsService,
    );

    await deleteTransactionsService.execute({
      transaction_id,
      user_id: id,
      isMaster,
    });

    return res.status(204).send();
  }
}

export { TransactionsController };
