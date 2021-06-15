import { Token } from "cheeket";
import { Logger, transport as Transport } from "winston";

const LoggerTokens = Object.freeze({
  RootLogger: Symbol("Logget@RootLogger") as Token<Logger>,
  Logger: Symbol("Logget@Logger") as Token<Logger>,
  Transports: Symbol("Logget@Transports") as Token<Transport[]>,
});

export default LoggerTokens;
