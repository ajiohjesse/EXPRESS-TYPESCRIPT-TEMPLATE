import { END_PONITS } from "@/constants/endpoints";
import { env } from "@/helpers/env";
import { forbiddenError } from "@/helpers/error";
import { getLogFiles } from "@/helpers/logger";
import { z } from "@/helpers/openapi/zod-extend";
import { sendResponse } from "@/helpers/response";
import { Router, type RequestHandler } from "express";
import fs from "fs";
import path from "path";

const router = Router();
export { router as logsRoute };

const authorizeLogsAccess: RequestHandler = async (req, _res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken || bearerToken.split(" ")[1] !== env.ADMIN_TOKEN)
    throw forbiddenError;
  next();
};

const logFilesSchema = z.object({
  logs: z.array(z.string()),
});

// Get list of available log files
router.get(END_PONITS.LOGS, authorizeLogsAccess, async (_, res) => {
  try {
    const logFiles = await getLogFiles();
    sendResponse<typeof logFilesSchema>(res, {
      type: "success",
      statusCode: 200,
      message: "Log files retrieved successfully",
      data: {
        logs: logFiles,
      },
    });
  } catch (error) {
    sendResponse(res, {
      type: "error",
      statusCode: 500,
      message: "Failed to retrieve log files",
      data: null,
    });
  }
});

// Download a specific log file
router.get(END_PONITS.LOGS + "/:filename", authorizeLogsAccess, (req, res) => {
  const filename = req.params.filename;
  const logDir = "logs";
  const filePath = path.join(process.cwd(), logDir, filename);

  if (!filename.endsWith(".log") || !fs.existsSync(filePath)) {
    return sendResponse(res, {
      type: "error",
      statusCode: 404,
      message: "Log file not found",
      data: null,
    });
  }

  res.download(filePath);
});
