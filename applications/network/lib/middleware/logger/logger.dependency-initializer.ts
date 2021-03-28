import { inContainerScope, interfaces } from "cheeket";
import * as winston from "winston";
import {
  consoleTransportProvider,
  fileTransportProvider,
  loggerProvider,
} from "@cheeket/winston";
import { ContainerContext, DependencyInitializer } from "@cheeket/koa";
import { override } from "@course-design/decorators";
import { ParameterizedContext } from "koa";

import LoggerToken from "./logger.token";
import childLoggerProvider from "./child-logger.provider";
import State from "../state";

class LoggerDependencyInitializer implements DependencyInitializer {
  private readonly errorFileProvider: interfaces.Provider<winston.transport>;

  private readonly combinedFileProvider: interfaces.Provider<winston.transport>;

  private readonly simpleConsoleTransportProvider: interfaces.Provider<winston.transport>;

  private readonly rootLoggerProvider: interfaces.Provider<winston.Logger>;

  private readonly containerLoggerProvider: interfaces.Provider<winston.Logger>;

  constructor(private readonly token: LoggerToken) {
    this.errorFileProvider = inContainerScope(
      fileTransportProvider({
        filename: "logs/error.log",
        level: "error",
      })
    );
    this.combinedFileProvider = inContainerScope(
      fileTransportProvider({ filename: "logs/combined.log" })
    );
    this.simpleConsoleTransportProvider = inContainerScope(
      consoleTransportProvider({ format: winston.format.simple() })
    );
    this.rootLoggerProvider = inContainerScope(
      loggerProvider(token.transport, {
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
        format: winston.format.combine(
          winston.format.errors({ stack: true }),
          winston.format.timestamp(),
          winston.format.json()
        ),
      })
    );
    this.containerLoggerProvider = inContainerScope(
      childLoggerProvider(token.rootLogger)
    );
  }

  @override
  init(context: ParameterizedContext<State, ContainerContext>): void {
    if (!context.containers.root.isBound(this.token.transport)) {
      context.containers.root.bind(
        this.token.transport,
        this.errorFileProvider
      );
      context.containers.root.bind(
        this.token.transport,
        this.combinedFileProvider
      );
      if (process.env.NODE_ENV !== "production") {
        context.containers.root.bind(
          this.token.transport,
          this.simpleConsoleTransportProvider
        );
      }
    }
    if (!context.containers.root.isBound(this.token.rootLogger)) {
      context.containers.root.bind(
        this.token.rootLogger,
        this.rootLoggerProvider
      );
    }
    if (!context.containers.context.isBound(this.token.logger)) {
      context.containers.context.bind(
        this.token.logger,
        this.containerLoggerProvider
      );
    }
  }
}

export default LoggerDependencyInitializer;
