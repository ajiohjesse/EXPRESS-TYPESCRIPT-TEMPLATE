import { errorHandler } from '@/middlewares/error.middleware';
import { notFoundHandler } from '@/middlewares/not-found.middleware';
import { rateLimiterMiddleware } from '@/middlewares/rate-limiter.middleware';
import requestLogger from '@/middlewares/request-logger.middleware';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import { END_PONITS } from './constants/endpoints';
import { docsRoute } from './features/api-docs/docs.route';
import { logsRoute } from './features/server-logs/logs.route';
import { sendResponse } from './helpers/response';
import router from './routes';

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

app.get('/', (_, res) => {
  sendResponse(res, {
    type: 'success',
    statusCode: 200,
    message: 'Server is running',
    data: null,
  });
});

app.get(END_PONITS.HEALTH_CHECK, (_, res) => {
  sendResponse(res, {
    type: 'success',
    statusCode: 200,
    message: 'Server is running',
    data: null,
  });
});

app.use(docsRoute);
app.use(logsRoute);

app.use(requestLogger);
app.use(rateLimiterMiddleware);

app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
