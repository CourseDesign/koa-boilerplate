import { Container } from "cheeket";
import { Middleware } from "koa";

import { LoggerModuleConfig } from "@internal/koa-koa-logger";

import Context from "../context";
import State from "../state";

interface Config {
  port?: number;
  container?: Container;
  logger?: LoggerModuleConfig;
  interceptor?: Middleware<State, Context>;
}

export default Config;
