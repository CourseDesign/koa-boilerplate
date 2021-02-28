import Router from "koa-router";

import { Context, pingPongMiddleware } from "../middleware";

const router = new Router<never, Context>();

router.prefix("/ping");

router.get("/", pingPongMiddleware);

export default router;
