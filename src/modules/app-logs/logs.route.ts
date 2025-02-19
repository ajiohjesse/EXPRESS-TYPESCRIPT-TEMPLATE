import { API_ROUTES } from '@/app/constants';
import { getLogFiles } from '@/helpers/logger';
import { sendResponse } from '@/helpers/response';
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';
const router = Router();
export { router as logsRoute };

const logFilesSchema = z.object({
  logs: z.array(z.string()),
});

// Get list of available log files
router.get(API_ROUTES.LOGS.GET_LOGS, async (_, res) => {
  try {
    const logFiles = await getLogFiles();
    sendResponse<typeof logFilesSchema>(res, {
      type: 'success',
      statusCode: 200,
      message: 'Log files retrieved successfully',
      data: {
        logs: logFiles,
      },
    });
  } catch (error) {
    sendResponse(res, {
      type: 'error',
      statusCode: 500,
      message: 'Failed to retrieve log files',
      data: null,
    });
  }
});

// Download a specific log file
router.get(API_ROUTES.LOGS.GET_LOG_FILE, (req, res) => {
  const filename = req.params.filename;
  const logDir = 'logs';
  const filePath = path.join(process.cwd(), logDir, filename);

  // Check if file exists and ends with .log
  if (!filename.endsWith('.log') || !fs.existsSync(filePath)) {
    return sendResponse(res, {
      type: 'error',
      statusCode: 404,
      message: 'Log file not found',
      data: null,
    });
  }

  res.download(filePath);
});
