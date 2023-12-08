import { container } from 'tsyringe';
import cron from 'node-cron';
import { SendEmailService } from '@modules/User/services/SendEmail.service';

const job = cron.schedule('0 12 * * *', () => {
  const sendEmailService = container.resolve(SendEmailService);
  sendEmailService.execute();
});

export { job };
