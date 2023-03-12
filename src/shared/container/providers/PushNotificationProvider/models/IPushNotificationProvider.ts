import { ISendPushNotificationDTO } from '../dtos/ISendPushNotificationDTO';

interface IPushNotificationProvider {
  sendPushNotification(data: ISendPushNotificationDTO): Promise<void>;
}

export { IPushNotificationProvider };
