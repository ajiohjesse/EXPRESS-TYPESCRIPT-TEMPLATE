import { PublicError } from "@/libs/errors/public-error";
import logger from "@/libs/logger";
import { z } from "@/libs/openapi/zod-extend";
import { sendResponse } from "@/libs/response";
import type { ErrorRequestHandler } from "express";

const errorDataSchema = z
  .record(z.string(), z.unknown())
  .nullable() satisfies z.ZodSchema;

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof PublicError) {
    sendResponse<typeof errorDataSchema>(res, {
      type: "error",
      statusCode: err.statusCode,
      message: err.message,
      data: err.data ?? null,
    });
  } else {
    // Properly capture error details with limited stack trace
    const stackLines = err.stack?.split("\n").slice(0, 5).join("\n");
    const errorDetails = {
      name: err.name,
      message: err.message,
      stack: stackLines,
      ...(err instanceof Error ? err : {}),
    };

    logger.error({
      message: "Unhandled Error",
      error: errorDetails,
      url: req.url,
      method: req.method,
    });

    sendResponse(res, {
      type: "error",
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
};
