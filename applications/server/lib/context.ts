import { Context as CheeketContext } from "@cheeket/koa";
import { RouterContext } from "koa-router";
import { LoggerContext } from "@internnal/logger";

type Context = CheeketContext & RouterContext & LoggerContext;

export default Context;
