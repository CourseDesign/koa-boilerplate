import Application from "koa";
import Context from "../context";
import State from "../state";

function pingPong(): Application.Middleware<State, Context> {
  return async (context, next) => {
    context.body = "pong";
    await next();
  };
}

export default pingPong;
