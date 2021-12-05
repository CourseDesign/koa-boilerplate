import { ContainerContext } from "cheeket-koa";

import { Context as LoggingContext } from "@internal/koa-logging";

type Context = ContainerContext & LoggingContext;

export default Context;
