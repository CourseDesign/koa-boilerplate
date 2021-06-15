import {
  createLogger,
  Logger,
  LoggerOptions,
  transport as Transport,
} from "winston";
import { Provider, Token } from "cheeket";

function loggerProvider(
  transportToken: Token<Transport[]>,
  options?: LoggerOptions
): Provider<Logger> {
  return async (resolver) => {
    return createLogger({
      transports: await resolver.resolve(transportToken),
      ...options,
    });
  };
}

export default loggerProvider;
