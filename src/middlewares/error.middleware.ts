import { PublicError } from '@/helpers/errors/public-error';
import logger from '@/helpers/logger';
import { z } from '@/helpers/openapi/zod-extend';
import { sendResponse } from '@/helpers/response';
import type { ErrorRequestHandler } from 'express';

const errorDataSchema = z
  .record(z.string(), z.unknown())
  .nullable() satisfies z.ZodSchema;

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof PublicError) {
    sendResponse<typeof errorDataSchema>(res, {
      type: 'error',
      statusCode: err.statusCode,
      message: err.message,
      data: err.data ?? null,
    });
  } else {
    // Properly capture error details with limited stack trace
    const stackLines = err.stack?.split('\n').slice(0, 5).join('\n');
    const errorDetails = {
      name: err.name,
      message: err.message,
      stack: stackLines,
      ...(err instanceof Error ? err : {}), // Include any additional properties if available
    };

    logger.error({
      message: 'Unhandled Error',
      error: errorDetails,
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
