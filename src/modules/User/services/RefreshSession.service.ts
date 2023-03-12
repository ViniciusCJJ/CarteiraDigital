import { v4 as uuidV4 } from 'uuid';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';
import { IRedisProvider } from '@shared/container/providers/RedisProvider/model/IRedisProvider';
import { refreshToken_config } from '@config/auth';
import { UserRole as Roles } from '@prisma/client';
import { jwtGenerate } from '@shared/util/jwtGenerate';
import { IUserRepository } from '../repositories/UserRepository.interface';
import {
  IRefreshResponseDTO,
  IRefreshSessionDTO,
} from './dto/RefreshSessionDTO';

@injectable()
class RefreshSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  public async execute({
    refresh_token,
  }: IRefreshSessionDTO): Promise<IRefreshResponseDTO> {
    const user_id = await this.redisProvider.get(
      `${refreshToken_config.prefix}${refresh_token}`,
    );
    if (!user_id) throw new AppError('Token inválido', 401);

    const user = await this.userRepository.findBy({
      id: user_id,
    });
    if (!user) throw new AppError('Usuário não encontrado', 404);

    await this.redisProvider.del(
      `${refreshToken_config.prefix}${refresh_token}`,
    );

    const jwToken = jwtGenerate(user.id, user.role === Roles.Master);

    const refreshToken = uuidV4();
    await this.redisProvider.set({
      key: `${refreshToken_config.prefix}${refreshToken}`,
      value: user.id,
      time: refreshToken_config.expiresIn,
      option: 'EX',
    });

    return {
      user,
      access_token: jwToken,
      refresh_token: refreshToken,
    };
  }
}

export { RefreshSessionService };
