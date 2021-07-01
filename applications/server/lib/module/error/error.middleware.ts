import Application from "koa";

import Context from "../../context";
import State from "../../state";
import createServerErrorResponse from "./create-server-error-response";
import ErrorAdapter from "./error-adapter";

function error(): Application.Middleware<State, Context> {
  return async (context, next) => {
    const { logger } = context;

    try {
      await next();
    } catch (e) {
      const status = e.status ?? e.statusCode ?? 500;
      if (status >= 500 && status < 600) {
        logger.error(e);

        context.status = status;
        context.body = createServerErrorResponse(status);
      } else {
        context.body = new ErrorAdapter(e);
      }
    }
  };
}

export default error;
