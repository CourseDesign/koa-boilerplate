import { Token } from "cheeket";
import { Logger } from "winston";
import * as Transport from "winston-transport";

type Dependency = Readonly<{
  // Global
  GlobalLogger: Token<Logger>;
  Transports: Token<Transport[]>;

  // Local
  LocalLogger: Token<Logger>;
  RequestId: Token<string>;
}>;

export default Dependency;
