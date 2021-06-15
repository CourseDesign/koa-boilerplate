import Router from "koa-router";

import Context from "../context";
import { status } from "../middleware";

function statusRoutes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.prefix("/status");

  router.get("/", status());

  return router;
}

export default statusRoutes;
