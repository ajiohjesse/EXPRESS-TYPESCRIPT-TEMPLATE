import { PublicError } from './public-error';

export const authenticationError = new PublicError(
  401,
  'You are not authenticated'
);

export const forbiddenError = new PublicError(
  403,
  'You are not allowed to access this resource'
);

export const notFoundError = new PublicError(404, 'Resource not found');

export const serverError = new PublicError(500, 'Internal Server Error');

export const rateLimitError = new PublicError(
  429,
  'Too many requests, please try again later'
);
