import {
  bindArray,
  bindObject,
  Container,
  Context,
  Done,
  inContainerScope,
  InternalEvents,
} from "cheeket";
import { local, ModuleManager } from "cheeket-koa-module";
import winston, { Logger } from "winston";
import * as Transport from "winston-transport";

import Dependency from "./dependency";
import LocalLoggingModule from "./local-logging.module";

class LoggingModule extends ModuleManager {
  private readonly globalLoggerProvider = inContainerScope(() => {
    return winston.createLogger({
      level: "info",
    });
  }, bindObject());

  private readonly consoleTransportProvider = inContainerScope(() => {
    return new winston.transports.Console() as Transport;
  }, bindArray());

  constructor(private readonly dependency: Dependency) {
    super();

    this.register(local(new LocalLoggingModule(this.dependency)));
  }

  configure(container: Container): void {
    super.configure(container);

    container.register(this.dependency.GlobalLogger, this.globalLoggerProvider);
    container.register(
      this.dependency.Transports,
      this.consoleTransportProvider
    );

    const prepareLogger = async (context: Context<unknown>, done: Done) => {
      if (context.request === this.dependency.GlobalLogger) {
        const logger = context.response as Logger;
        const transports = await container.resolve(this.dependency.Transports);
        transports.forEach((transport) => {
          logger.add(transport);
        });
        container.removeListener(InternalEvents.CreateAsync, prepareLogger);
      }
      done();
    };

    container.on(InternalEvents.CreateAsync, prepareLogger);
  }
}

export default LoggingModule;
