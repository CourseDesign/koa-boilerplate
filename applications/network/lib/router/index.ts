import Router from "koa-router";
import { Context } from "../middleware";

import pingPongRouter from "./ping-pong.router";
import versionRouter from "./version.router";

const router = new Router<never, Context>();

router.use(pingPongRouter.routes());
router.use(versionRouter.routes());

export default router;
