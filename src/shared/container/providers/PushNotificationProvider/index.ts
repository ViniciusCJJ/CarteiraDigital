import { container } from 'tsyringe';

import { IPushNotificationProvider } from './models/IPushNotificationProvider';

import { PushNotificationProvider } from './implementations/PushNotificationProvider';

container.registerSingleton<IPushNotificationProvider>(
  'PushNotificationProvider',
  PushNotificationProvider,
);
