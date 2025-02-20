import { errorHandler } from '@/middlewares/error.middleware';
import { notFoundHandler } from '@/middlewares/not-found.middleware';
import { rateLimiterMiddleware } from '@/middlewares/rate-limiter.middleware';
import requestLogger from '@/middlewares/request-logger.middleware';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import { docsRoute } from './docs';
import { healthCheckRoute } from './health-check';
import { logsRoute } from './logs';
import { apiRoutes } from './router';
function createApp() {
  const app = express();

  app.use(
    cors({
      origin: '*',
    })
  );

  app.use((req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      express.json({ limit: '10mb' })(req, res, next);
    } else {
      next();
    }
  });

  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(helmet());
  app.use(cookieParser());

  app.use(healthCheckRoute);
  app.use(docsRoute);
  app.use(logsRoute);

  app.use(requestLogger);
  app.use(rateLimiterMiddleware);

  app.use(apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createApp();
