import { authenticationError } from '@/helpers/error';
import logger from '@/helpers/logger';
import { type RequestHandler } from 'express';

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) throw authenticationError;

  logger.info(`Bearer token received: ${bearerToken}`);

  const token = bearerToken.split(' ')[1];

  logger.info(token);

  // validate token -->

  res.locals.userId = 'user-id';
  next();
};
