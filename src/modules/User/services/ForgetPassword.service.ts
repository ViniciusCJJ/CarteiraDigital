import { inject, injectable } from 'tsyringe';
import path from 'path';
import crypto from 'crypto';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { AppError } from '@shared/error/AppError';
import { IHashProvider } from '@shared/container/providers/HashProvider/model/IHashProvider';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IForgotPasswordDTO } from './dto/ForgotPasswordDTO';

@injectable()
class ForgotPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email }: IForgotPasswordDTO): Promise<void> {
    const user = await this.userRepository.findBy({ email });

    if (!user) throw new AppError('Usuário não encontrado');

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    const password = crypto.randomBytes(4).toString('hex');

    const hashedPassword = await this.hashProvider.generateHash(password);

    user.password = hashedPassword;

    await this.userRepository.update(user);

    this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          password,
        },
      },
    });
  }
}

export { ForgotPasswordService };
