import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { plainToInstance } from 'class-transformer';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IDeleteUserAvatarDTO } from './dto/DeleteUserAvatarDTO';
import { User } from '../entities/User';

@injectable()
class DeleteUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    request_id,
  }: IDeleteUserAvatarDTO): Promise<User> {
    if (request_id !== user_id)
      throw new AppError('Usuário não autorizado', 404);

    const user = await this.userRepository.findBy({
      id: user_id,
    });

    if (!user) throw new AppError('Usuário não encontrado', 404);

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    user.avatar = null;

    const newUser = await this.userRepository.update(user);

    return plainToInstance(User, newUser);
  }
}

export { DeleteUserAvatarService };
