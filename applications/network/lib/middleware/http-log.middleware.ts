import Application, { DefaultState } from "koa";
import Context from "./context";
import { LoggerToken } from "../logger";

const httpLogMiddleware: Application.Middleware<DefaultState, Context> = async (
  context,
  next
) => {
  const start = new Date();
  const logger = await context.resolve(LoggerToken.Logger);
  const { request, response } = context;

  try {
    await next();

    const end = new Date();
    logger.http(
      `${request.method} ${request.url} ${response.status} ${
        request.length
      } - ${end.getMilliseconds() - start.getMilliseconds()}ms`
    );
  } catch (e) {
    const end = new Date();

    logger.error(
      `${request.method} ${request.url} ${response.status} ${
        request.length
      } - ${end.getMilliseconds() - start.getMilliseconds()}ms`
    );
    logger.error(e);

    throw e;
  }
};

export default httpLogMiddleware;
