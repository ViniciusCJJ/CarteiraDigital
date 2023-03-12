import nodemailer, { Transporter } from 'nodemailer';
import { mailConfig } from '@config/mail';
import { injectable, inject } from 'tsyringe';

import { IMailTemplateProvider } from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import { IMailProvider } from '../models/IMailProvider';
import { ISendMailDTO } from '../dtos/ISendMailDTO';

@injectable()
export class SendinBlueProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      auth: {
        user: process.env.SENDINBLUE_EMAIL,
        pass: process.env.SENDINBLUE_PASSWORD,
      },
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.email,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
