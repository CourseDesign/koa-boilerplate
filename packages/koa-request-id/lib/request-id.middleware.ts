import Application from "koa";
import { v4 } from "uuid";

import State from "./state";

function requestId(): Application.Middleware<State> {
  return async (context, next) => {
    context.state.requestId = v4();
    await next();
  };
}

export default requestId;
