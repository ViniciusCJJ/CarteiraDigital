import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import { plainToInstance } from 'class-transformer';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IShowUserDTO } from './dto/ShowUserDTO';
import { User } from '../entities/User';

@injectable()
class ShowUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    isMaster,
    request_id,
  }: IShowUserDTO): Promise<User> {
    if (request_id !== user_id && !isMaster)
      throw new AppError('Usuário não autorizado', 404);

    const user = await this.userRepository.findBy({
      id: user_id,
    });

    if (!user) throw new AppError('Usuário não encontrado', 404);

    return plainToInstance(User, user);
  }
}

export { ShowUserService };
