import { interfaces } from "cheeket";
import { Logger } from "winston";
import { Token as KoaToken } from "@cheeket/koa";

function childLoggerProvider(
  loggerToken: interfaces.Token<Logger>
): interfaces.Provider<Logger> {
  return async (context) => {
    const logger = await context.resolve(loggerToken);
    const { state, request } = await context.resolve(KoaToken.Context);

    return logger.child({
      method: request.method,
      url: request.url,
      requestId: state.requestId,
    });
  };
}

export default childLoggerProvider;
