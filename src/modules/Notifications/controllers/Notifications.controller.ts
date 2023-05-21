import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListNotificationsService } from '../services/ListNotifications.service';
import { UpdateNotificationsService } from '../services/UpdateNotifications.service';

class NotificationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listNotifications = container.resolve(ListNotificationsService);
    const { page, limit, read } = request.query;

    const filters = {};
    if (read !== undefined) {
      if (read === 'false') {
        Object.assign(filters, { read: false });
      } else {
        Object.assign(filters, { read: true });
      }
    }
    Object.assign(filters, { user_id: request.user.id });

    const notifications = await listNotifications.execute({
      filters,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    return response.json(notifications);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { read } = request.body;
    const { notification_id } = request.params;

    const listNotifications = container.resolve(UpdateNotificationsService);

    const notifications = await listNotifications.execute({
      id: notification_id,
      read,
    });

    return response.json(notifications);
  }
}
export { NotificationsController };
