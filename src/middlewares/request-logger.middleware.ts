import { END_PONITS } from '@/app/endpoints';
import logger from '@/helpers/logger';
import morgan from 'morgan';

// Create a write stream for Morgan
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

const requestLogger = morgan('combined', {
  stream,
  skip: req => req.url === END_PONITS.HEALTH_CHECK,
});

export default requestLogger;
