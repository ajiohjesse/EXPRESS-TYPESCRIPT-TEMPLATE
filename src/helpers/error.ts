export class PublicError extends Error {
  override message: string;
  statusCode: number;
  data?: Record<string, unknown>;

  constructor(
    statusCode: number,
    message: string,
    data?: Record<string, unknown>
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.name = "PublicError";
  }
}

export const authenticationError = new PublicError(
  401,
  "You are not authenticated"
);

export const forbiddenError = new PublicError(
  403,
  "You are not allowed to access this resource"
);

export const notFoundError = new PublicError(404, "Resource not found");

export const serverError = new PublicError(500, "Internal Server Error");

export const rateLimitError = new PublicError(
  429,
  "Too many requests, try again later"
);
