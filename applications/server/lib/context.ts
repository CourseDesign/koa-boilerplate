import { Context as CheeketContext } from "@cheeket/koa";
import { RouterContext } from "koa-router";
import { DefaultContext } from "koa";

import { LoggerContext } from "@internal/koa-logger";
import { SerializeContext } from "@internal/koa-serialize";

type Context = DefaultContext &
  CheeketContext &
  RouterContext &
  LoggerContext &
  SerializeContext;

export default Context;
