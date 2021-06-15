import { Module } from "@cheeket/koa";
import { Container, inContainerScope } from "cheeket";
import * as winston from "winston";
import LoggerTokens from "./logger.tokens";
import contextLoggerProvider from "./provider/context-logger.provider";
import {
  consoleTransportProvider,
  fileTransportProvider,
  loggerProvider,
} from "./provider";

class LoggerModule implements Module {
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
  }

  configureContext(container: Container): void {
    container.bind(LoggerTokens.Logger, this.contextLoggerProvider);
  }
}
export default LoggerModule;
