import { inject, injectable } from 'tsyringe';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { AppError } from '@shared/error/AppError';
import { IEmailRepository } from '../repositories/EmailRepository.interface';
import { IUserRepository } from '../repositories/UserRepository.interface';

@injectable()
class SendEmailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('EmailRepository')
    private emailRepository: IEmailRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<void> {
    const initial = new Date();
    initial.setHours(0, 0, 0, 0);
    const final = new Date();
    final.setHours(23, 59, 59, 999);

    const emailsToSend = await this.emailRepository.listBy({
      initial_date: initial,
      final_date: final,
    });

    const emailTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'email_template.hbs',
    );

    emailsToSend.results.map(async email => {
      const user = await this.userRepository.findBy({ id: email.user_id });
      if (!user) throw new AppError('User not found');
      this.mailProvider.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        from: {
          name: 'mensagem do dia',
          address: 'noreply@mensagemdodia.com',
        },
        subject: `Olá: ${email.user.name}`,
        templateData: {
          file: emailTemplate,
          variables: {
            message: email.message,
            name: email.user.name,
            image: faker.image.urlPicsumPhotos(),
          },
        },
      });
    });
  }
}

export { SendEmailService };
