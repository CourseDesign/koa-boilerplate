import { DefaultContext, DefaultState } from "koa";
import { IMiddleware } from "koa-router";

import Context from "./context";

type Middleware<StateT = DefaultState, ContextT = DefaultContext> = IMiddleware<
  StateT,
  ContextT & Context
>;

export default Middleware;
