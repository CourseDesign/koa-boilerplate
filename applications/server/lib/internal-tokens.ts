import { Token } from "cheeket";
import { Logger } from "winston";
import * as Transport from "winston-transport";

import Dependency from "./type/dependency";

const InternalTokens: Dependency = Object.freeze({
  GlobalLogger: Symbol.for("Logger") as Token<Logger>,
  LocalLogger: Symbol.for("Logger") as Token<Logger>,
  Transports: Symbol.for("Transports") as Token<Transport[]>,

  RequestId: Symbol.for("RequestId") as Token<string>,
});

export default InternalTokens;
