import { Token, Provider } from "cheeket";
import { Logger } from "winston";
import { Tokens as KoaToken } from "@cheeket/koa";

function contextLoggerProvider(loggerToken: Token<Logger>): Provider<Logger> {
  return async (context) => {
    const logger = await context.resolve(loggerToken);
    const { state, request } = await context.resolve(KoaToken.Context);

    return logger.child({
      ip: request.ip,
      url: request.url,
      method: request.method,
      requestId: state.id,
    });
  };
}

export default contextLoggerProvider;
