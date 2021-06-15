import Router from "koa-router";
import Context from "../context";

import pigPongRoutes from "./ping-pong.routes";
import versionRoutes from "./version.routes";
import statusRoutes from "./status.routes";

function routes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.use(pigPongRoutes().routes());
  router.use(versionRoutes().routes());
  router.use(statusRoutes().routes());

  return router;
}

export default routes;
