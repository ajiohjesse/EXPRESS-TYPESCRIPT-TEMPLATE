import app from './app';
import { env } from './helpers/env';
import logger from './helpers/logger';
import registerCronJobs from './jobs/cron';

const server = app.listen(env.PORT, () => {
  logger.info(`${env.NODE_ENV} server started on port ${env.PORT}`);
  registerCronJobs();
});

export default server;
