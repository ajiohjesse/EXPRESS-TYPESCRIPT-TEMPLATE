import { errorHandler } from '@/middlewares/error.middleware';
import { notFoundHandler } from '@/middlewares/not-found.middleware';
import { rateLimiterMiddleware } from '@/middlewares/rate-limiter.middleware';
import requestLogger from '@/middlewares/request-logger.middleware';
import { healthCheckRoute } from '@/modules/health-check/health-check.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import { appRoutes } from './routes';

function createApp() {
  const app = express();

  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
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

  app.use(requestLogger);
  app.use(healthCheckRoute);
  app.use(rateLimiterMiddleware);
  app.use(appRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createApp();
