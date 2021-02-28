import Application, { DefaultState } from "koa";
import Context from "./context";

const pingPongMiddleware: Application.Middleware<
  DefaultState,
  Context
> = async (context, next) => {
  context.body = "pong";
  await next();
};

export default pingPongMiddleware;
