import path from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';
import { env } from './env';

// Define log directory
const logDir = 'logs';

// Define log formats
const formats = {
  console: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message, ...meta }) =>
        `${timestamp} [${level}]: ${message}${
          Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ''
        }`
    )
  ),
  file: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
};

// Create rotating file transport for error logs
const errorFileRotateTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
  level: 'error',
  format: formats.file,
});

// Create rotating file transport for combined logs
const combinedFileRotateTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'combined-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
  format: formats.file,
});

// Create logger instance
const logger = winston.createLogger({
  level: env.isDev ? 'debug' : 'info',
  transports: [
    new winston.transports.Console({
      format: formats.console,
    }),
    errorFileRotateTransport,
    combinedFileRotateTransport,
  ],
});

// Export a function to get all log files
export const getLogFiles = async (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const fs = require('fs').promises;
    fs.readdir(logDir)
      .then((files: string[]) => {
        resolve(files.filter(file => file.endsWith('.log')));
      })
      .catch(reject);
  });
};

export default logger;
