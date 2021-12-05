import { DefaultContext, DefaultState, Middleware as KMiddleware } from "koa";

import Context from "./context";

type Middleware<StateT = DefaultState, ContextT = DefaultContext> = KMiddleware<
  StateT,
  ContextT & Context
>;

export default Middleware;
