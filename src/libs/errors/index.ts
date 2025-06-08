import { PublicError } from "./public-error";

const authenticationError = new PublicError(401, "You are not authenticated");
const forbiddenError = new PublicError(
  403,
  "You are not allowed to access this resource"
);
const notFoundError = new PublicError(404, "Resource not found");
const serverError = new PublicError(500, "Internal Server Error");
const rateLimitError = new PublicError(
  429,
  "Too many requests, try again later"
);

export const errors = {
  authenticationError,
  forbiddenError,
  notFoundError,
  serverError,
  rateLimitError,
};
