import { IMailProvider } from '../models/IMailProvider';
import { ISendMailDTO } from '../dtos/ISendMailDTO';

interface IMessage {
  to: string;
  body: string;
}

class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  public async sendMail({ to, templateData }: ISendMailDTO): Promise<void> {
    this.messages.push({ to: to.email, body: templateData.file });
  }
}

export { FakeMailProvider };
