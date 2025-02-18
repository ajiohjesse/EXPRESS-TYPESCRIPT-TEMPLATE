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
    this.name = 'PublicError';
  }
}
