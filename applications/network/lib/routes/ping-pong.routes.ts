import Router from "koa-router";

import Context from "../context";
import { pingPongMiddleware } from "../middleware";

function pigPongRoutes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.prefix("/ping");

  router.get("/", pingPongMiddleware);

  return router;
}

export default pigPongRoutes;
