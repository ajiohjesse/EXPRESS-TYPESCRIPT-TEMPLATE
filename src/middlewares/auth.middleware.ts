import { errors } from "@/libs/errors";
import logger from "@/libs/logger";
import { type RequestHandler } from "express";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) throw errors.authenticationError;

  logger.info(`Bearer token received: ${bearerToken}`);

  const token = bearerToken.split(" ")[1];

  logger.info(token);

  // validate token -->

  res.locals.userId = "user-id";
  next();
};
