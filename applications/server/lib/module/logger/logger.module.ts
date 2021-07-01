import { SimpleModule } from "@cheeket/koa";
import { Container, inContainerScope, Middleware } from "cheeket";
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
    }),
    { array: true }
  );

  private readonly combinedFileTransportProvider = inContainerScope(
    fileTransportProvider({ filename: "logs/combined.log" }),
    { array: true }
  );

  private readonly simpleConsoleTransportProvider = inContainerScope(
    consoleTransportProvider({ format: winston.format.simple() }),
    { array: true }
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

  private readonly slackTransportProvider?: Middleware<winston.transport[]>;

  constructor(config: LoggerModuleConfig) {
    super();

    if (config.slackWebhook) {
      this.slackTransportProvider = inContainerScope(
        slackTransportProvider({
          webhookUrl: config.slackWebhook,
          level: "error",
          formatter: slackTransportFormatter,
        }),
        { array: true }
      );
    }
  }

  configureRoot(container: Container): void {
    container.bind(LoggerTokens.Transports, this.errorFileTransportProvider);
    container.bind(LoggerTokens.Transports, this.combinedFileTransportProvider);
    if (process.env.NODE_ENV !== "production") {
      container.bind(
        LoggerTokens.Transports,
        this.simpleConsoleTransportProvider
      );
    }
    container.bind(LoggerTokens.RootLogger, this.rootLoggerProvider);
    if (this.slackTransportProvider != null) {
      container.bind(LoggerTokens.Transports, this.slackTransportProvider);
    }
  }

  configureContext(container: Container): void {
    container.bind(LoggerTokens.Logger, this.contextLoggerProvider);
  }
}
export default LoggerModule;
