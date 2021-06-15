import Application from "koa";

import State from "../../state";
import Context from "../../context";

function status(): Application.Middleware<State, Context> {
  return async (context, next) => {
    context.body = {
      cpu: process.cpuUsage(),
      memory: process.memoryUsage(),
      resource: process.resourceUsage(),
    };
    context.status = 200;

    await next();
  };
}

export default status;
