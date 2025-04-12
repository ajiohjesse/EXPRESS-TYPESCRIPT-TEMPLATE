import { sendResponse } from "@/helpers/response";
import type { RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (_, res) => {
  sendResponse(res, {
    type: "error",
    statusCode: 404,
    message: "Resource not found",
    data: null,
  });
};
