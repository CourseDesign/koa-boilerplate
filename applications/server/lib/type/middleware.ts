import { DefaultContext, DefaultState } from "koa";
import { IMiddleware } from "koa-router";
import { ContainerContext } from "cheeket-koa";

type Middleware<StateT = DefaultState, ContextT = DefaultContext> = IMiddleware<
  StateT,
  ContextT & ContainerContext
>;

export default Middleware;
