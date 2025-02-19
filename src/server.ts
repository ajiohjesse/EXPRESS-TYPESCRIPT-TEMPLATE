import app from './app';
import { env } from './helpers/env';
import logger from './helpers/logger';

const server = app.listen(env.PORT, () => {
  logger.info(`Server started on port ${env.PORT}`);
});

export default server;
