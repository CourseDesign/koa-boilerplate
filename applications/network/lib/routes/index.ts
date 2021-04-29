import Router from "koa-router";
import { Context } from "../middleware";

import pigPongRoutes from "./ping-pong.routes";
import versionRoutes from "./version.routes";

function routes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.use(pigPongRoutes().routes());
  router.use(versionRoutes().routes());

  return router;
}

export default routes;
