import { interfaces } from "cheeket";
import {
  createLogger,
  LoggerOptions,
  Logger,
  transports,
  format,
} from "winston";

function loggerProvider(options: LoggerOptions): interfaces.Provider<Logger> {
  return async () => {
    const logger = createLogger(options);
    if (process.env.NODE_ENV !== "production") {
      logger.add(
        new transports.Console({
          format: format.simple(),
        })
      );
    }

    return logger;
  };
}

export default loggerProvider;
