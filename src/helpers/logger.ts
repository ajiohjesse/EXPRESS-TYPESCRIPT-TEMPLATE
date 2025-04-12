import path from "path";
import winston from "winston";
import "winston-daily-rotate-file";
import { env } from "./env";

const logDir = "logs";

const formats = {
  console: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message, ...meta }) =>
        `${timestamp} [${level}]: ${message}${
          Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ""
        }`
    )
  ),
  file: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
};

const errorFileRotateTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, "error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxFiles: "30d",
  level: "error",
  format: formats.file,
});

const combinedFileRotateTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, "combined-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxFiles: "30d",
  format: formats.file,
});

const logger = winston.createLogger({
  level: env.isDev ? "debug" : "info",
  transports: [
    new winston.transports.Console({
      format: formats.console,
    }),
    errorFileRotateTransport,
    combinedFileRotateTransport,
  ],
});

export const getLogFiles = async (): Promise<string[]> => {
  const files = await import("fs/promises");
  const allFiles = await files.readdir(logDir);
  return allFiles.filter(file => file.endsWith(".log"));
};

export default logger;
