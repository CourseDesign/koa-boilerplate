import { Token } from "cheeket";
import { SimpleModule } from "cheeket-koa-module";
import { Logger } from "winston";
import * as Transport from "winston-transport";

import Context from "./context";

type Dependency = Readonly<{
  LoggingModule: Token<SimpleModule<Context>>;

  // Global
  GlobalLogger: Token<Logger>;
  Transports: Token<Transport[]>;

  // Local
  LocalLogger: Token<Logger>;
  RequestId: Token<string>;
}>;

export default Dependency;
