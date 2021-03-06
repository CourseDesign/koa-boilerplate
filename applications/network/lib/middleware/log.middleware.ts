import Application, { DefaultState } from "koa";
import Context from "./context";
import { LoggerToken } from "../logger";

const logMiddleware: Application.Middleware<DefaultState, Context> = async (
  context,
  next
) => {
  const start = new Date();
  const logger = await context.resolve(LoggerToken.Logger);
  const { request, response } = context;

  function createHttpMessage(): string {
    const end = new Date();
    return `${request.method} ${request.url} ${response.status} ${
      request.length
    } - ${end.getMilliseconds() - start.getMilliseconds()}ms`;
  }

  try {
    await next();

    logger.http(createHttpMessage());
  } catch (e) {
    if (e.status == null || (e.status >= 500 && e.status < 600)) {
      logger.error(createHttpMessage());
      logger.error(e.toString());
    } else {
      logger.http(createHttpMessage());
    }

    throw e;
  }
};

export default logMiddleware;
