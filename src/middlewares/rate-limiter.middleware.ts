import { sendResponse } from '@/helpers/response';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

interface RateLimiterRes {
  msBeforeNext: string;
  remainingPoints: number;
  consumedPoints: number;
  isFirstInDuration: boolean;
}

const generalLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
  blockDuration: 60 * 2,
  keyPrefix: 'general',
});

const authLimiter = new RateLimiterMemory({
  points: 20,
  duration: 60 * 5,
  blockDuration: 60 * 15,
  keyPrefix: 'auth',
});

const emailLimiter = new RateLimiterMemory({
  points: 3,
  duration: 60 * 30,
  blockDuration: 60 * 15,
  keyPrefix: 'email',
});

// General rate limiting middleware
export const rateLimiterMiddleware: RequestHandler = async (req, res, next) => {
  await consumeLimiter(generalLimiter, req, res, next);
};

// Auth rate limiting middleware
export const authRateLimiter: RequestHandler = async (req, res, next) => {
  await consumeLimiter(authLimiter, req, res, next);
};

// Email rate limiting middleware
export const emailRateLimiter: RequestHandler = async (req, res, next) => {
  await consumeLimiter(emailLimiter, req, res, next);
};

function getClientIp(req: Request): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket.remoteAddress ||
    'unknown'
  ).replace(/[^a-zA-Z0-9]/g, '_');
}

async function consumeLimiter(
  limiter: RateLimiterMemory,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return limiter
    .consume(getClientIp(req))
    .then(() => {
      next();
    })
    .catch((error: RateLimiterRes) => {
      const headers = {
        'Retry-After': Number(error.msBeforeNext) / 1000,
        'X-RateLimit-Limit': generalLimiter.points,
        'X-RateLimit-Remaining': error.remainingPoints,
        'X-RateLimit-Reset': new Date(Date.now() + error.msBeforeNext),
      };

      res.set('Retry-After', headers['Retry-After'].toString());
      res.set('X-RateLimit-Limit', headers['X-RateLimit-Limit'].toString());
      res.set(
        'X-RateLimit-Remaining',
        headers['X-RateLimit-Remaining'].toString()
      );
      res.set('X-RateLimit-Reset', headers['X-RateLimit-Reset'].toString());

      sendResponse(res, {
        type: 'error',
        message: 'Too many requests',
        statusCode: 429,
        data: null,
      });
    });
}
