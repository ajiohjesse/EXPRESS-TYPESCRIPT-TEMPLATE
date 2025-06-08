import { sendResponse } from "@/libs/response";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RateLimiterMemory } from "rate-limiter-flexible";

interface RateLimiterError {
  msBeforeNext: number;
  remainingPoints: number;
  consumedPoints: number;
  isFirstInDuration: boolean;
}

const LIMITERS = {
  general: new RateLimiterMemory({
    points: 100, // 100 requests per minute (reasonable for API usage)
    duration: 60,
    keyPrefix: "general",
  }),
  auth: new RateLimiterMemory({
    points: 5, // 5 auth attempts per 15 minutes (prevents brute force)
    duration: 60 * 15,
    keyPrefix: "auth",
  }),
  email: new RateLimiterMemory({
    points: 5, // 5 emails per hour (prevents spam)
    duration: 60 * 60,
    keyPrefix: "email",
  }),
} as const;

// Extract client IP with better fallback chain
function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : forwarded?.split(",")[0] || req.socket.remoteAddress || "unknown";

  return ip.replace(/[^a-zA-Z0-9.:]/g, "_");
}

function getConsumeKey(limiter: RateLimiterMemory, req: Request): string {
  if (limiter === LIMITERS.email) {
    // Safely extract email with validation
    const email = req.body?.email;
    if (typeof email === "string" && email.includes("@")) {
      return email;
    }
  }
  return getClientIp(req);
}

async function consumeLimiter(
  limiter: RateLimiterMemory,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const consumeKey = getConsumeKey(limiter, req);

  try {
    const limiterRes = await limiter.consume(consumeKey);

    res.set("X-RateLimit-Limit", limiter.points.toString());
    res.set("X-RateLimit-Remaining", limiterRes.remainingPoints.toString());

    next();
  } catch (error) {
    const rateLimitError = error as RateLimiterError;
    const retryAfterSeconds = Math.ceil(rateLimitError.msBeforeNext / 1000);

    res.set({
      "Retry-After": retryAfterSeconds.toString(),
      "X-RateLimit-Limit": limiter.points.toString(),
      "X-RateLimit-Remaining": rateLimitError.remainingPoints.toString(),
      "X-RateLimit-Reset": new Date(
        Date.now() + rateLimitError.msBeforeNext
      ).toISOString(),
    });

    sendResponse(res, {
      type: "error",
      message: "Too many requests",
      statusCode: StatusCodes.TOO_MANY_REQUESTS,
      data: null,
    });
  }
}

export const rateLimiterMiddleware: RequestHandler = (req, res, next) =>
  consumeLimiter(LIMITERS.general, req, res, next);

export const authRateLimiter: RequestHandler = (req, res, next) =>
  consumeLimiter(LIMITERS.auth, req, res, next);

export const emailRateLimiter: RequestHandler = (req, res, next) =>
  consumeLimiter(LIMITERS.email, req, res, next);
