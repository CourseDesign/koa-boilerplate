import { SimpleModule } from "@cheeket/koa";
import { Container, inContainerScope, MiddlewareAdapter } from "cheeket";
import * as winston from "winston";

import LoggerTokens from "./logger.tokens";
import {
  contextLoggerProvider,
  consoleTransportProvider,
  fileTransportProvider,
  loggerProvider,
  slackTransportProvider,
  slackTransportFormatter,
} from "./provider";

export type LoggerModuleConfig = {
  slackWebhook?: string;
};

class LoggerModule extends SimpleModule {
  private readonly errorFileTransportProvider = inContainerScope(
    fileTransportProvider({
      filename: "logs/error.log",
      level: "error",
    })
  );

  private readonly combinedFileTransportProvider = inContainerScope(
    fileTransportProvider({ filename: "logs/combined.log" })
  );

  private readonly simpleConsoleTransportProvider = inContainerScope(
    consoleTransportProvider({ format: winston.format.simple() })
  );

  private readonly rootLoggerProvider = inContainerScope(
    loggerProvider(LoggerTokens.Transports, {
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.json()
      ),
    })
  );

  private readonly contextLoggerProvider = inContainerScope(
    contextLoggerProvider(LoggerTokens.RootLogger)
  );

  private readonly slackTransportProvider?: MiddlewareAdapter<winston.transport>;

  constructor(config: LoggerModuleConfig) {
    super();

    if (config.slackWebhook) {
      this.slackTransportProvider = inContainerScope(
        slackTransportProvider({
          webhookUrl: config.slackWebhook,
          level: "error",
          formatter: slackTransportFormatter,
        })
      );
    }
  }

  configureRoot(container: Container): void {
    container.bind(
      LoggerTokens.Transports,
      this.errorFileTransportProvider.bind({ array: true })
    );
    container.bind(
      LoggerTokens.Transports,
      this.combinedFileTransportProvider.bind({ array: true })
    );
    if (process.env.NODE_ENV !== "production") {
      container.bind(
        LoggerTokens.Transports,
        this.simpleConsoleTransportProvider.bind({ array: true })
      );
    }
    container.bind(LoggerTokens.RootLogger, this.rootLoggerProvider.bind());
    if (this.slackTransportProvider != null) {
      container.bind(
        LoggerTokens.Transports,
        this.slackTransportProvider.bind({ array: true })
      );
    }
  }

  configureContext(container: Container): void {
    container.bind(LoggerTokens.Logger, this.contextLoggerProvider.bind());
  }
}
export default LoggerModule;
