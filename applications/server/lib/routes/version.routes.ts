import Router from "koa-router";

import Context from "../context";
import { version } from "../middleware";

function versionRoutes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.prefix("/version");

  router.get("/", version());

  return router;
}

export default versionRoutes;
