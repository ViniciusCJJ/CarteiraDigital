import { container } from 'tsyringe';
import { SendinBlueProvider } from './implementations/SendBlueMailProvider';

import { IMailProvider } from './models/IMailProvider';

const sendinBlueProvider = container.resolve(SendinBlueProvider);

container.registerInstance<IMailProvider>('MailProvider', sendinBlueProvider);
