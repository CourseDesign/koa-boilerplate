import Application from "koa";
import Context from "./context";
import State from "./state";
import { LoggerToken } from "../logger";

const logMiddleware: Application.Middleware<State, Context> = async (
  context,
  next
) => {
  const logger = await context.resolve(LoggerToken.Logger);
  const { request, response } = context;

  try {
    await next();
  } finally {
    logger.http("");
  }
};

export default logMiddleware;
