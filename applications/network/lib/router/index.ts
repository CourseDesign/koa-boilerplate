import Router from "koa-router";
import { Context } from "../middleware";

import pingPongRouter from "./ping-pong.router";

const router = new Router<never, Context>();

router.use(pingPongRouter.routes());

export default router;
