import Router from "koa-router";

import { Context, versionMiddleware } from "../middleware";

function versionRoutes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.prefix("/version");

  router.get("/", versionMiddleware);

  return router;
}

export default versionRoutes;
