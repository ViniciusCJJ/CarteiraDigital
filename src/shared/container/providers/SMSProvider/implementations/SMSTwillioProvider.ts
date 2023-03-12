import axios, { AxiosInstance } from 'axios';
import { ISMSProvider } from '../models/ISMSProvider';
import { ISendSMSDTO } from '../dtos/ISendSMSDTO';

class SmsTwillioProvider implements ISMSProvider {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILLIO_ACCOUNT_SID}`,
      auth: {
        username: process.env.TWILLIO_ACCOUNT_SID || '',
        password: process.env.TWILLIO_AUTH_TOKEN || '',
      },
    });
  }

  public async sendSMS({ message, number }: ISendSMSDTO): Promise<void> {
    await this.api.post('Messages.json', {
      From: process.env.TWILLIO_PHONE_NUMBER,
      To: number,
      Body: message,
    });
  }
}

export { SmsTwillioProvider };
