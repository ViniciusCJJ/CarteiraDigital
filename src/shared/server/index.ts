import 'dotenv/config';

import '@shared/database';

import { app } from './app';

const port = process.env.PORT || 3333;

app.listen(port, async () => {
  /* eslint-disable no-console */
  console.log(`🚀 Server started on http://localhost:${port}`);
});
