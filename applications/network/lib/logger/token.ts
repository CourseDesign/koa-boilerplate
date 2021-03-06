import { Logger } from "winston";
import { interfaces } from "cheeket";

const Token = Object.freeze({
  Logger: Symbol("Logger@Logger") as interfaces.Token<Logger>,
});

export default Token;
