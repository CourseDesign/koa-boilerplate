import Application from "koa";
import Context from "./context";
import State from "./state";

const pingPongMiddleware: Application.Middleware<State, Context> = async (
  context,
  next
) => {
  context.body = "pong";
  await next();
};

export default pingPongMiddleware;
