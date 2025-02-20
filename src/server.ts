import app from './app';
import { env } from './helpers/env';
import logger from './helpers/logger';

const server = app.listen(env.PORT, () => {
  console.log({ ...env });
  logger.info(`${env.NODE_ENV} server started on port ${env.PORT}`);
});

export default server;
