import winston from "winston";
import { env } from "./env";

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
};

const logger = winston.createLogger({
  level: env.isDev ? "debug" : "info",
  transports: [
    new winston.transports.Console({
      format: formats.console,
    }),
  ],
});

export default logger;
