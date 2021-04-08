import Router from "koa-router";

import { Context, versionMiddleware } from "../middleware";

const router = new Router<never, Context>();

router.prefix("/version");

router.get("/", versionMiddleware);

export default router;
