import { ContainerContext } from "@cheeket/koa";
import { RouterContext } from "koa-router";

type Context = ContainerContext & RouterContext;

export default Context;
