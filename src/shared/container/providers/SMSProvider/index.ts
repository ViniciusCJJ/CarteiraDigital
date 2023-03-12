import { container } from 'tsyringe';
import { SmsTwillioProvider } from './implementations/SMSTwillioProvider';
import { SMSZenviaProvider } from './implementations/SMSZenviaProvider';

import { ISMSProvider } from './models/ISMSProvider';

const smsDriver = process.env.SMS_DRIVER as 'twillio' | 'zenvia';

const providers = {
  twillio: container.resolve(SmsTwillioProvider),
  zenvia: container.resolve(SMSZenviaProvider),
};

container.registerInstance<ISMSProvider>('SMSProvider', providers[smsDriver]); // --> providers[smsDriver] <-- Error
