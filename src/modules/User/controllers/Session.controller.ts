import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSessionService } from '../services/CreateSession.service';
import { DestroySessionService } from '../services/DestroySession.service';
import { RefreshSessionService } from '../services/RefreshSession.service';

class SessionController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password, remember_me, device_token } = req.body;

    const createSessionService = container.resolve(CreateSessionService);

    const resp = await createSessionService.execute({
      email,
      password,
      device_token,
      remember_me,
    });

    return res.json(resp);
  }

  async refresh(req: Request, res: Response): Promise<Response> {
    const { refresh_token } = req.body;

    const refreshSessionService = container.resolve(RefreshSessionService);

    const resp = await refreshSessionService.execute({
      refresh_token,
    });

    return res.json(resp);
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { refresh_token } = req.body;

    const destroySessionService = container.resolve(DestroySessionService);

    await destroySessionService.execute({
      userId: user_id,
      refresh_token,
    });

    return res.status(204).send();
  }
}

export { SessionController };
