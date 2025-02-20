import app from './app';
import { env } from './helpers/env';
import logger from './helpers/logger';

const server = app.listen(env.PORT, () => {
  logger.debug(JSON.stringify({ ...env }, null, 2));
  logger.info(`${env.NODE_ENV} server started on port ${env.PORT}`);
});

export default server;
