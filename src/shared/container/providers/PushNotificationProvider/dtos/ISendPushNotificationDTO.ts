interface ISendPushNotificationDTO {
  device_token: string;
  title?: string;
  content: string;
}

export { ISendPushNotificationDTO };
