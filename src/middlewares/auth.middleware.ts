import { authenticationError } from '@/helpers/errors';
import { type RequestHandler } from 'express';

export const authMiddleware: RequestHandler = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) throw authenticationError;

  const token = bearerToken.split(' ')[1];
  console.log(token);

  //decode token to get userId

  res.locals.userId = 'user-id';
  next();
};
