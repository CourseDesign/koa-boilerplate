import { Token } from "cheeket";
import { SimpleModule } from "cheeket-koa-module";
import { Logger } from "winston";
import * as Transport from "winston-transport";

import Dependency from "./dependency";
import Context from "./context";

const DefaultDependency: Dependency = Object.freeze({
  LoggingModule: Symbol("LoggingModule") as Token<SimpleModule<Context>>,

  GlobalLogger: Symbol("GlobalLogger") as Token<Logger>,
  Transports: Symbol("Transports") as Token<Transport[]>,

  LocalLogger: Symbol("LocalLogger") as Token<Logger>,
  RequestId: Symbol("RequestId") as Token<string>,
});

export default DefaultDependency;
