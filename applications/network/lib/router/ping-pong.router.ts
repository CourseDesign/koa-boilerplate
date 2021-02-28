import Router from "koa-router";

import pingPongMiddleware from "../middleware/ping-pong.middleware";
import { Context } from "../middleware";

const router = new Router<never, Context>();

router.prefix("/ping");

router.get("/", pingPongMiddleware);

export default router;
