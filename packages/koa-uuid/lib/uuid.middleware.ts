import Application from "koa";
import { v4 } from "uuid";

import State from "./state";

function uuid(): Application.Middleware<State> {
  return async (context, next) => {
    context.state.requestId = v4();
    await next();
  };
}

export default uuid;
