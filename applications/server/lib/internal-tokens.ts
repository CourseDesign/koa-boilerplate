import { Token } from "cheeket";
import { Logger } from "winston";
import * as Transport from "winston-transport";

import Dependency from "./type/dependency";

const InternalTokens: Dependency = Object.freeze({
  GlobalLogger: Symbol("GlobalLogger") as Token<Logger>,
  LocalLogger: Symbol("LocalLogger") as Token<Logger>,
  Transports: Symbol("Transports") as Token<Transport[]>,

  RequestId: Symbol("RequestId") as Token<string>,
});

export default InternalTokens;
