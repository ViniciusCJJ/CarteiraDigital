import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';
import { IRedisProvider } from '@shared/container/providers/RedisProvider/model/IRedisProvider';
import { refreshToken_config } from '@config/auth';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IDestroySessionDTO } from './dto/DestroySessionDTO';

@injectable()
class DestroySessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  public async execute({
    refresh_token,
    userId,
  }: IDestroySessionDTO): Promise<void> {
    const user_id = await this.redisProvider.get(
      `${refreshToken_config.prefix}${refresh_token}`,
    );
    if (!user_id) throw new AppError('Token inválido', 401);
    if (userId !== user_id) throw new AppError('Token inválido', 401);

    const user = await this.userRepository.findBy({
      id: user_id,
    });
    if (!user) throw new AppError('Usuário não encontrado', 404);

    await this.redisProvider.del(
      `${refreshToken_config.prefix}${refresh_token}`,
    );
  }
}

export { DestroySessionService };
