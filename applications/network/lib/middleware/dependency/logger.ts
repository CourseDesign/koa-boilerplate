import Application from "koa";
import { inContainerScope, interfaces } from "cheeket";
import {
  consoleTransportProvider,
  fileTransportProvider,
  loggerProvider,
} from "@cheeket/winston";
import * as winston from "winston";
import { Logger, transport as Transport } from "winston";
import Context from "../context";
import State from "../state";
import childLoggerProvider from "./child-logger.provider";

export type Token = {
  rootLogger: interfaces.Token<Logger>;
  logger: interfaces.Token<Logger>;
  transport: interfaces.Token<Transport>;
};

function logger(token: Token): Application.Middleware<State, Context> {
  const errorFileProvider = inContainerScope(
    fileTransportProvider({
      filename: "logs/error.log",
      level: "error",
    })
  );
  const combinedFileProvider = inContainerScope(
    fileTransportProvider({ filename: "logs/combined.log" })
  );
  const simpleConsoleTransportProvider = inContainerScope(
    consoleTransportProvider({ format: winston.format.simple() })
  );
  const rootLoggerProvider = inContainerScope(
    loggerProvider(token.transport, {
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.json()
      ),
    })
  );
  const containerLoggerProvider = inContainerScope(
    childLoggerProvider(token.rootLogger)
  );

  function initDependency(context: Context): void {
    if (!context.containers.root.isBound(token.transport)) {
      context.containers.root.bind(token.transport, errorFileProvider);
      context.containers.root.bind(token.transport, combinedFileProvider);
      if (process.env.NODE_ENV !== "production") {
        context.containers.root.bind(
          token.transport,
          simpleConsoleTransportProvider
        );
      }
    }
    if (!context.containers.root.isBound(token.rootLogger)) {
      context.containers.root.bind(token.rootLogger, rootLoggerProvider);
    }
    if (!context.containers.context.isBound(token.logger)) {
      context.containers.context.bind(token.logger, containerLoggerProvider);
    }
  }

  return async (context, next) => {
    initDependency(context);

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const logger = await context.resolve(token.logger);

    try {
      await next();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  };
}

export default logger;
