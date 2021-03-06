import { interfaces } from "cheeket";

const Token = Object.freeze({
  RequestId: Symbol("Koa@RequestId") as interfaces.Token<string>,
});

export default Token;
