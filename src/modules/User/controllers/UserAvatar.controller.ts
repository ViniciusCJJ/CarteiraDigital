import { AppError } from '@shared/error/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserAvatarService } from '../services/DeleteUserAvatar.service';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatar.service';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    if (!request.file) {
      throw new AppError('Nenhum arquivo enviado', 400);
    }

    const { id: request_id } = request.user;
    const { user_id } = request.params;
    const { filename } = request.file;

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id,
      request_id,
      avatarFilename: filename,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: request_id } = request.user;
    const { user_id } = request.params;

    const deleteUserAvatarService = container.resolve(DeleteUserAvatarService);

    const user = await deleteUserAvatarService.execute({
      user_id,
      request_id,
    });

    return response.json(user);
  }
}

export { UserAvatarController };
