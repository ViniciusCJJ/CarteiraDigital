import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';
import { IHashProvider } from '@shared/container/providers/HashProvider/model/IHashProvider';
import { plainToInstance } from 'class-transformer';
import { UserRole as Roles } from '@prisma/client';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { ICreateUserDTO } from './dto/CreateUserDTO';
import { User } from '../entities/User';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    role = Roles.User,
  }: ICreateUserDTO): Promise<User> {
    const user_exists = await this.userRepository.findBy({ email });

    if (user_exists) throw new AppError('Email já cadastrado');

    const hashed_password = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashed_password,
      role,
    });

    await this.userRepository.update(user);

    return plainToInstance(User, user);
  }
}

export { CreateUserService };
