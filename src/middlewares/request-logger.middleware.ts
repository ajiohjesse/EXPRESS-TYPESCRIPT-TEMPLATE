import { API_ROUTES } from '@/app/constants';
import { env } from '@/helpers/env';
import logger from '@/helpers/logger';
import morgan from 'morgan';

// Create a write stream for Morgan
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Create Morgan middleware with different formats for development and production
const requestLogger = morgan(
  env.isDev
    ? 'dev' // Concise output colored by response status for development
    : ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', // More detailed logging for production
  {
    stream,
    skip: req => req.url === API_ROUTES.HEALTH_CHECK, // Skip logging health check requests
  }
);

export default requestLogger;
