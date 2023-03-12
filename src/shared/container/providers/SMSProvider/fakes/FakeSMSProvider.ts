import { ISMSProvider } from '../models/ISMSProvider';
import { ISendSMSDTO } from '../dtos/ISendSMSDTO';

interface IMessage {
  message: string;
  number: string;
}

class FakeSMSProvider implements ISMSProvider {
  private messages: IMessage[] = [];

  public async sendSMS({ message, number }: ISendSMSDTO): Promise<void> {
    this.messages.push({ message, number });
  }
}

export { FakeSMSProvider };
