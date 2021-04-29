import Application from "koa";
import { use } from "@cheeket/koa";

import Context from "../context";
import State from "../state";
import LoggerDependencyInitializer from "./logger.dependency-initializer";
import LoggerToken from "./logger.token";

function logger(): Application.Middleware<State, Context> {
  return use(new LoggerDependencyInitializer(), async (context, next) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const logger = await context.resolve(LoggerToken.Logger);
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
  });
}

export default logger;
