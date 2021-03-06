import { Logger, transport as Transport } from "winston";
import { interfaces } from "cheeket";

const Token = Object.freeze({
  RootLogger: Symbol("Logger@RootLogger") as interfaces.Token<Logger>,
  Logger: Symbol("Logger@Logger") as interfaces.Token<Logger>,
  Transport: Symbol("Logger@Transport") as interfaces.Token<Transport>,
});

export default Token;
