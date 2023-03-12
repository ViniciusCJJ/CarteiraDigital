import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import { plainToInstance } from 'class-transformer';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IUpdateUserDTO } from './dto/UpdateUserDTO';
import { User } from '../entities/User';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    request_id,
    ...userParams
  }: IUpdateUserDTO): Promise<User> {
    if (request_id !== user_id)
      throw new AppError('Usuário não autorizado', 404);

    const user = await this.userRepository.findBy({
      id: user_id,
    });

    if (!user) throw new AppError('Usuário não encontrado', 404);

    Object.assign(user, userParams);

    const newUser = await this.userRepository.update(user);

    return plainToInstance(User, newUser);
  }
}

export { UpdateUserService };
