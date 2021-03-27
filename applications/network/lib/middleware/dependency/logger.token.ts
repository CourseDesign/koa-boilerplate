import { interfaces } from "cheeket";
import { Logger, transport as Transport } from "winston";

type LoggerToken = {
  rootLogger: interfaces.Token<Logger>;
  logger: interfaces.Token<Logger>;
  transport: interfaces.Token<Transport>;
};

export default LoggerToken;
