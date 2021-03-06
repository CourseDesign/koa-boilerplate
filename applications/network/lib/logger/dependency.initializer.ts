import * as winston from "winston";
import { inContainerScope, interfaces } from "cheeket";
import { Initializer } from "@cheeket/koa";
import {
  loggerProvider,
  fileTransportProvider,
  consoleTransportProvider,
} from "@cheeket/winston";
import { override } from "@util/decorator";

import { ParameterizedContext } from "koa";
import Token from "./token";
import { State } from "../middleware";
import childLoggerProvider from "./child-logger.provider";

class DependencyInitializer implements Initializer<State> {
  private readonly errorFileProvider = inContainerScope(
    fileTransportProvider({
      filename: "logs/error.log",
      level: "error",
    })
  );

  private readonly combinedFileProvider = inContainerScope(
    fileTransportProvider({ filename: "logs/combined.log" })
  );

  private readonly consoleTransportProvider = inContainerScope(
    consoleTransportProvider({ format: winston.format.simple() })
  );

  private readonly loggerProvider = inContainerScope(
    loggerProvider(Token.Transport, {
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      format: winston.format.json(),
    })
  );

  private readonly childLoggerProvider = inContainerScope(
    childLoggerProvider(Token.RootLogger)
  );

  @override
  initRootContainer(container: interfaces.Container): void {
    container.bind(Token.Transport, this.errorFileProvider);
    container.bind(Token.Transport, this.combinedFileProvider);
    if (process.env.NODE_ENV !== "production") {
      container.bind(Token.Transport, this.consoleTransportProvider);
    }

    container.bind(Token.RootLogger, this.loggerProvider);
  }

  @override
  initContextContainer(
    container: interfaces.Container,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ParameterizedContext<State>
  ): void {
    container.bind(Token.Logger, this.childLoggerProvider);
  }
}

export default DependencyInitializer;
