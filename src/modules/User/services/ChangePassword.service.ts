import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';

import { AppError } from '@shared/error/AppError';
import { IHashProvider } from '@shared/container/providers/HashProvider/model/IHashProvider';
import { plainToInstance } from 'class-transformer';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IChangePasswordDTO } from './dto/ChangePasswordDTO';
import { User } from '../entities/User';

@injectable()
class ChangePasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    old_password,
    new_password,
    user_id,
    request_id,
  }: IChangePasswordDTO): Promise<User> {
    if (request_id !== user_id)
      throw new AppError('Usuário não autorizado', 404);

    const user = await this.userRepository.findBy({ id: user_id });

    if (!user) throw new AppError('Usuário não encontrado', 404);

    const passwordMatched = await compare(old_password, user.password);

    if (!passwordMatched) throw new AppError('Senha inválida', 401);

    const hash_password = await this.hashProvider.generateHash(new_password);

    user.password = hash_password;

    const new_user = await this.userRepository.update(user);

    return plainToInstance(User, new_user);
  }
}

export { ChangePasswordService };
