import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '../services/CreateUser.service';
import { DeleteUserService } from '../services/DeleteUser.service';
import { ShowUserService } from '../services/ShowUser.service';
import { UpdateUserService } from '../services/UpdateUser.service';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, role } = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
      role,
    });

    return res.status(201).json(user);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { user: userRequest } = req;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({
      user_id,
      isMaster: userRequest.isMaster,
      request_id: userRequest.id,
    });

    return res.json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { id } = req.user;
    const { name, email } = req.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      user_id,
      request_id: id,
      name,
      email,
    });

    return res.json(user);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { id } = req.user;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({
      user_id,
      request_id: id,
    });

    return res.status(204).send();
  }
}

export { UserController };
