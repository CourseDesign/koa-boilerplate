import { Token } from "cheeket";
import { Logger } from "winston";
import * as Transport from "winston-transport";

type Dependency = Readonly<{
  // Out
  GlobalLogger: Token<Logger>;
  LocalLogger: Token<Logger>;
  Transports: Token<Transport[]>;

  // In
  RequestId: Token<string>;
}>;

export default Dependency;
