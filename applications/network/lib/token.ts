import { interfaces } from "cheeket";
import { Logger, transport as Transport } from "winston";
import { LoggerToken } from "./middleware";

const Token: LoggerToken = Object.freeze({
  rootLogger: Symbol("Logger@RootLogger") as interfaces.Token<Logger>,
  logger: Symbol("Logger@Logger") as interfaces.Token<Logger>,
  transport: Symbol("Logger@Transport") as interfaces.Token<Transport>,
});

export default Token;
