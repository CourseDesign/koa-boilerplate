import Router from "koa-router";

import { Context } from "../type";

function rootRouter(): Router<unknown, Context> {
  return new Router<unknown, Context>();
}

export default rootRouter;
