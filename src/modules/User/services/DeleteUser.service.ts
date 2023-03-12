import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/UserRepository.interface';
import { IDeleteUserDTO } from './dto/DeleteUserDTO';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id, request_id }: IDeleteUserDTO): Promise<void> {
    if (request_id !== user_id)
      throw new AppError('Usuário não encontrado', 404);

    const user = await this.userRepository.findBy({ id: user_id });

    if (!user) throw new AppError('Usuário não encontrado', 404);

    await this.userRepository.remove(user);
  }
}

export { DeleteUserService };
