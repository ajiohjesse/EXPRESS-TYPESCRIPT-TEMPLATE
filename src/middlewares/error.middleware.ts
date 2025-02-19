import { PublicError } from '@/helpers/errors/public-error';
import logger from '@/helpers/logger';
import { sendResponse } from '@/helpers/response';
import type { ErrorRequestHandler } from 'express';
import { z } from 'zod';

const errorDataSchema = z.record(z.string(), z.unknown()).nullable();

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof PublicError) {
    sendResponse<typeof errorDataSchema>(res, {
      type: 'error',
      statusCode: err.statusCode,
      message: err.message,
      data: err.data ?? null,
    });
  } else {
    logger.error('Unhandled Error:', {
      error: err,
      url: req.url,
      method: req.method,
    });
    sendResponse(res, {
      type: 'error',
      statusCode: 500,
      message: 'Internal Server Error',
      data: null,
    });
  }
};
