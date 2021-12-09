/* eslint-disable @typescript-eslint/no-shadow,@typescript-eslint/no-explicit-any */

import { SimpleModule } from "cheeket-koa-module";
import { InternalTokens } from "cheeket-koa";
import {
  bindArray,
  bindObject,
  Container,
  Context as CContext,
  Done,
  inContainerScope,
  InternalEvents,
} from "cheeket";
import winston, { Logger } from "winston";
import * as Transport from "winston-transport";
import requestId from "koa-requestid";

import Dependency from "./dependency";
import DefaultDependency from "./default-dependency";
import Context from "./context";
import isServerError from "./is-server-error";
import errorAdapt from "./error-adapt";

class LoggingModule extends SimpleModule<Context> {
  private readonly globalLoggerProvider = inContainerScope(() => {
    return winston.createLogger();
  }, bindObject());

  private readonly localLoggerProvider = inContainerScope<Logger>(
    async (context) => {
      const globalLogger = await context.resolve(this.dependency.GlobalLogger);
      const requestId = await context.resolve(this.dependency.RequestId);

      return globalLogger.child({ requestId });
    },
    bindObject()
  );

  private readonly consoleTransportProvider = inContainerScope(() => {
    return new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
        winston.format.printf((info) => {
          return `${info.timestamp} [${
            info.requestId
          }] ${info.level.toUpperCase()} ${info.name} - ${info.message}`;
        }),
        winston.format.colorize({ all: true })
      ),
    }) as Transport;
  }, bindArray());

  private readonly requestIdProvider = inContainerScope(async (context) => {
    const koaContext = await context.resolve(InternalTokens.Context);
    return koaContext.state.id;
  }, bindObject());

  constructor(private readonly dependency: Dependency = DefaultDependency) {
    super();

    this.use(
      requestId({
        expose: "Request-Id",
        header: "Request-Id",
        query: false,
      }),
      async (context, next) => {
        const logger = await context.resolve(this.dependency.LocalLogger);
        context.logger = logger;

        try {
          await next();
        } catch (e: any) {
          const status = e.status ?? e.statusCode ?? 500;
          if (isServerError(status)) {
            logger.error(e);
          }

          if (e instanceof Error) {
            context.response.body = errorAdapt(e, status);
          } else {
            throw e;
          }
        }
      }
    );
  }

  protected configureGlobal(container: Container): void {
    container.register(this.dependency.LoggingModule, (context) => {
      context.response = this;
    });
    container.register(this.dependency.GlobalLogger, this.globalLoggerProvider);

    if (process.env.NODE_ENV !== "production") {
      container.register(
        this.dependency.Transports,
        this.consoleTransportProvider
      );
    }

    this.configureGlobalLogger(container);
  }

  protected configureLocal(container: Container): void {
    container.register(this.dependency.LocalLogger, this.localLoggerProvider);
    container.register(this.dependency.RequestId, this.requestIdProvider);

    this.configureLocalLogger(container);
  }

  private configureGlobalLogger(container: Container): void {
    const onCreateListener = async (context: CContext<unknown>, done: Done) => {
      if (context.request === this.dependency.GlobalLogger) {
        const logger = context.response as Logger;
        const transports = await container.resolve(this.dependency.Transports);
        transports.forEach((transport) => {
          logger.add(transport);
        });
        container.removeListener(
          InternalEvents.PostCreateAsync,
          onCreateListener
        );
      }
      done();
    };

    const onClearListener = (value: unknown) => {
      const logger = this.globalLoggerProvider.get(container);
      if (logger !== undefined && logger === value) {
        logger.clear();
        container.removeListener(InternalEvents.Clear, onClearListener);
      }
    };

    container.on(InternalEvents.PostCreateAsync, onCreateListener);
    container.on(InternalEvents.Clear, onClearListener);
  }

  private configureLocalLogger(container: Container): void {
    const onClearListener = (value: unknown) => {
      const logger = this.localLoggerProvider.get(container);
      if (logger !== undefined && logger === value) {
        logger.clear();
        container.removeListener(InternalEvents.Clear, onClearListener);
      }
    };

    container.on(InternalEvents.Clear, onClearListener);
  }
}

export default LoggingModule;
