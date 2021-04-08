import { interfaces } from "cheeket";
import { Logger, transport as Transport } from "winston";

const LoggerToken = Object.freeze({
  RootLogger: Symbol("Logget@RootLogger") as interfaces.Token<Logger>,
  Logger: Symbol("Logget@RootLogger") as interfaces.Token<Logger>,
  Transport: Symbol("Logget@RootLogger") as interfaces.Token<Transport>,
});

export default LoggerToken;
