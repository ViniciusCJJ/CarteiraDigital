import express, { json, Request } from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';

import { LoggerStream } from '@config/winston';
import '../container';

import { uploadConfig } from '@config/upload';
import { PushNotificationProvider } from '@shared/container/providers/PushNotificationProvider/implementations/PushNotificationProvider';
import { UserController } from '@modules/User/controllers/User.controller';
import { globalErrorHandler } from '../middleware/globalErrorHandler';
import { router } from './routes';

const app = express();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

morgan.token('body', (req: Request) => JSON.stringify(req.body));
morgan.token('user', (req: Request) => JSON.stringify(req.user));
app.use(
  morgan(
    `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - "body": ':body' - ":referrer" "user: ':user' ":user-agent"`,
    {
      skip: (req, res) => res.statusCode >= 400,
      stream: new LoggerStream(),
    },
  ),
);

app.use(json());

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(router);

app.use(globalErrorHandler);

export { app };
