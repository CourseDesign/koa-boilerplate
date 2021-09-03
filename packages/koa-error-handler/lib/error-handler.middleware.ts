import Application from "koa";

import { LoggerContext, LoggerState } from "@internal/koa-logger";

import isServerError from "./is-server-error";
import createServerErrorResponse from "./create-server-error-response";
import ErrorAdapter from "./error-adapter";

function errorHandler(): Application.Middleware<LoggerState, LoggerContext> {
  return async (context, next) => {
    const { logger } = context;

    try {
      await next();
    } catch (e) {
      const status = e.status ?? e.statusCode ?? 500;
      context.status = status;

      if (isServerError(status)) {
        logger.error(e);
        context.body = createServerErrorResponse(status);
      } else {
        context.body = new ErrorAdapter(e);
      }
    }
  };
}

export default errorHandler;
