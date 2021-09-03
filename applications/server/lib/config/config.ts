import { Container } from "cheeket";
import { Middleware } from "koa";

import { LoggerModuleConfig } from "@internal/logger";

import Context from "../context";
import State from "../state";

interface Config {
  port?: number;
  container?: Container;
  logger?: LoggerModuleConfig;
  interceptor?: Middleware<State, Context>;
}

export default Config;
