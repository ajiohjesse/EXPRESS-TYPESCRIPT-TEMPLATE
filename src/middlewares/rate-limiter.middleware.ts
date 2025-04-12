import { sendResponse } from "@/helpers/response";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RateLimiterMemory } from "rate-limiter-flexible";

interface RateLimiterRes {
  msBeforeNext: string;
  remainingPoints: number;
  consumedPoints: number;
  isFirstInDuration: boolean;
}

const generalLimiter = new RateLimiterMemory({
  points: 1800, //fillrate 30/sec
  duration: 60,
  keyPrefix: "general",
});

const authLimiter = new RateLimiterMemory({
  points: 20, //fillrate 4/min
  duration: 60 * 5,
  keyPrefix: "auth",
});

const emailLimiter = new RateLimiterMemory({
  points: 3, //fillrate 3/hr
  duration: 60 * 60,
  keyPrefix: "email",
});

// General rate limiting middleware
export const rateLimiterMiddleware: RequestHandler = async (req, res, next) => {
  await consumeLimiter(generalLimiter, req, res, next);
};

export const authRateLimiter: RequestHandler = async (req, res, next) => {
  await consumeLimiter(authLimiter, req, res, next);
};

export const emailRateLimiter: RequestHandler = async (req, res, next) => {
  await consumeLimiter(emailLimiter, req, res, next);
};

function getClientIp(req: Request): string {
  return (
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown"
  ).replace(/[^a-zA-Z0-9]/g, "_");
}

async function consumeLimiter(
  limiter: RateLimiterMemory,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isEmailLimiter = limiter === emailLimiter;

  const consumeKey =
    isEmailLimiter && req.body.email ? req.body.email : getClientIp(req);

  return limiter
    .consume(consumeKey)
    .then(limiterRes => {
      res.set("X-RateLimit-Limit", limiter.points.toString());
      res.set("X-RateLimit-Remaining", limiterRes.remainingPoints.toString());
      next();
    })
    .catch((error: RateLimiterRes) => {
      const headers = {
        "Retry-After": String(Number(error.msBeforeNext) / 1000),
        "X-RateLimit-Limit": generalLimiter.points.toString(),
        "X-RateLimit-Remaining": error.remainingPoints.toString(),
        "X-RateLimit-Reset": new Date(
          Date.now() + error.msBeforeNext
        ).toISOString(),
      };

      res.set("Retry-After", headers["Retry-After"]);
      res.set("X-RateLimit-Limit", headers["X-RateLimit-Limit"]);
      res.set("X-RateLimit-Remaining", headers["X-RateLimit-Remaining"]);
      res.set("X-RateLimit-Reset", headers["X-RateLimit-Reset"]);

      sendResponse(res, {
        type: "error",
        message: "Too many requests",
        statusCode: StatusCodes.TOO_MANY_REQUESTS,
        data: null,
      });
    });
}
