import { END_PONITS } from "@/constants/endpoints";
import logger from "@/libs/logger";
import morgan from "morgan";

const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

const requestLogger = morgan("combined", {
  stream,
  skip: req => req.url === END_PONITS.HEALTH_CHECK,
});

export default requestLogger;
