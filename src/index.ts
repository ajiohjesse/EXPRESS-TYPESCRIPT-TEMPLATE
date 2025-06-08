import app from "./app";
import registerCronJobs from "./jobs/cron";
import { env } from "./libs/env";
import logger from "./libs/logger";

const server = app.listen(env.PORT, () => {
  logger.info(`${env.NODE_ENV} server started on port ${env.PORT}`);
  registerCronJobs();
});

export default server;
