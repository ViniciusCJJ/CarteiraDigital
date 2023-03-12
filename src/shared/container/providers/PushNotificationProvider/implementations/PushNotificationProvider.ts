import axios, { AxiosInstance } from 'axios';
import { IPushNotificationProvider } from '../models/IPushNotificationProvider';
import { ISendPushNotificationDTO } from '../dtos/ISendPushNotificationDTO';

class PushNotificationProvider implements IPushNotificationProvider {
  private expoApi: AxiosInstance;

  private firebaseApi: AxiosInstance;

  constructor() {
    this.expoApi = axios.create({
      headers: {
        Host: 'exp.host',
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      baseURL: 'https://exp.host/--/api/v2/push/',
    });

    this.firebaseApi = axios.create({
      headers: {
        Host: 'fcm.googleapis.com',
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
        Authorization: `key=${process.env.FIREBASE_SERVER_KEY}`,
      },
      baseURL: 'https://fcm.googleapis.com/fcm/',
    });
  }

  public async sendPushNotification({
    device_token,
    title,
    content,
  }: ISendPushNotificationDTO): Promise<void> {
    if (device_token.includes('ExponentPushToken')) {
      const message = {
        to: device_token,
        title,
        body: content,
      };
      return this.expoApi.post('send', message);
    }

    const message = {
      to: device_token,
      priority: 'normal',
      notification: {
        title,
        body: content,
      },
    };

    return this.firebaseApi.post('send', message);
  }
}

export { PushNotificationProvider };
