import Application from "koa";
import compose from "koa-compose";
import { install } from "@cheeket/koa";

import Context from "../../context";
import State from "../../state";

import LoggerModule, { LoggerModuleConfig } from "./logger.module";
import LoggerTokens from "./logger.tokens";

function logger(
  config: LoggerModuleConfig
): Application.Middleware<State, Context> {
  const module = new LoggerModule(config);

  return compose<State, Context, State, Context>([
    install(module),
    async (context, next) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const logger = await context.resolve(LoggerTokens.Logger);
      if (context.logger == null) {
        context.logger = logger;
      }

      try {
        await next();
      } catch (e) {
        const status = e.status ?? e.statusCode ?? 500;
        if (status >= 500 && status < 600) {
          logger.error(e);
        }
        throw e;
      }
    },
  ]);
}

export default logger;
