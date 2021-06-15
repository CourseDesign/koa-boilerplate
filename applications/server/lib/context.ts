import { Context as CheeketContext } from "@cheeket/koa";
import { RouterContext } from "koa-router";
import { Logger } from "winston";

type Context = CheeketContext & RouterContext & { logger: Logger };

export default Context;
