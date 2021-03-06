import { interfaces } from "cheeket";
import { Logger } from "winston";
import { Token as KoaToken } from "@cheeket/koa";

function childLoggerProvider(
  loggerToken: interfaces.Token<Logger>
): interfaces.Provider<Logger> {
  return async (context) => {
    const logger = await context.resolve(loggerToken);
    const koaContext = await context.resolve(KoaToken.Context);
    const { state } = koaContext;

    return logger.child({ requestId: state.requestId });
  };
}

export default childLoggerProvider;
