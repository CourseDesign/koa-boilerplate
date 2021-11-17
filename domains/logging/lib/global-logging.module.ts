import {
  bindArray,
  bindObject,
  Container,
  Context,
  Done,
  inContainerScope,
  InternalEvents,
} from "cheeket";
import { Module } from "cheeket-koa-module";
import winston, { Logger } from "winston";
import * as Transport from "winston-transport";

import Dependency from "./dependency";

class GlobalLoggingModule implements Module {
  private readonly globalLoggerProvider = inContainerScope(() => {
    return winston.createLogger({
      level: "info",
    });
  }, bindObject());

  private readonly consoleTransportProvider = inContainerScope(() => {
    return new winston.transports.Console() as Transport;
  }, bindArray());

  constructor(private readonly dependency: Dependency) {}

  configure(container: Container): void {
    container.register(this.dependency.GlobalLogger, this.globalLoggerProvider);
    container.register(
      this.dependency.Transports,
      this.consoleTransportProvider
    );

    this.configureLogger(container);
  }

  private configureLogger(container: Container): void {
    const listener = async (context: Context<unknown>, done: Done) => {
      if (context.request === this.dependency.GlobalLogger) {
        const logger = context.response as Logger;
        const transports = await container.resolve(this.dependency.Transports);
        transports.forEach((transport) => {
          logger.add(transport);
        });
        container.removeListener(InternalEvents.CreateAsync, listener);
      }
      done();
    };

    container.on(InternalEvents.CreateAsync, listener);
  }
}

export default GlobalLoggingModule;
