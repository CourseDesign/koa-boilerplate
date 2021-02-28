import { ContainerContext } from "@cheeket/koa";
import { RouterContext } from "koa-router";

import Request from "./request";

type Context = ContainerContext & RouterContext & { request: Request };

export default Context;
