import { InternalTokens as parent } from "cheeket-koa-module";
import { Token } from "cheeket";
import { Logger } from "winston";
import * as Transport from "winston-transport";

const InternalTokens = Object.freeze({
  ...parent,

  GlobalLogger: Symbol.for("Logger") as Token<Logger>,
  LocalLogger: Symbol.for("Logger") as Token<Logger>,
  Transports: Symbol.for("Transports") as Token<Transport[]>,

  RequestId: Symbol.for("RequestId") as Token<string>,
});

export default InternalTokens;
