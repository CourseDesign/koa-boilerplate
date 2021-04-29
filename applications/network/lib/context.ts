import { ContainerContext } from "@cheeket/koa";
import { RouterContext } from "koa-router";
import { Logger } from "winston";

type Context = ContainerContext & RouterContext & { logger: Logger };

export default Context;
