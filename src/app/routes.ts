import { authRoute } from '@/modules/auth/auth.route';
import { healthCheckRoute } from '@/modules/health-check/health-check.route';
import { type RequestHandler } from 'express';

export const appRoutes: RequestHandler[] = [authRoute, healthCheckRoute];
