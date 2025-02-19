import { logsRoute } from '@/modules/app-logs/logs.route';
import { authRoute } from '@/modules/auth/auth.route';
import { healthCheckRoute } from '@/modules/health-check/health-check.route';
import { postRoute } from '@/modules/post/post.route';
import { sseRoute } from '@/modules/sse/sse.route';
import { type RequestHandler } from 'express';

export const appRoutes: RequestHandler[] = [
  logsRoute,
  authRoute,
  healthCheckRoute,
  sseRoute,
  postRoute,
];
