import './StorageProvider';
import './MailTemplateProvider';
import './MailProvider';
import './PushNotificationProvider';
import './SMSProvider';
import './RedisProvider';
import './HashProvider';

import { job as cron } from '@shared/util/startCron';

cron.start();
