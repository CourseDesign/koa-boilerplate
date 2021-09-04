import "reflect-metadata";

import { Server } from "net";
import Application from "koa";
import koaQs from "koa-qs";
import bodyParser from "koa-bodyparser";
import requestId from "koa-requestid";
import { dependency } from "@cheeket/koa";

import { deserialize, serialize } from "@internal/koa-serialize";
import { logger } from "@internal/koa-logger";
import { errorHandler } from "@internal/koa-error-handler";

import routes from "./routes";
import { Config } from "./config";

const requestIdHeader = "Request-ID";

async function bootstrap(config: Config): Promise<Server> {
  const application = new Application();

  koaQs(application);

  application.use(dependency(config.container));
  application.use(serialize());

  application.use(
    requestId({ expose: requestIdHeader, header: requestIdHeader })
  );

  application.use(logger(config.logger ?? {}));
  application.use(errorHandler());

  if (config.interceptor != null) {
    application.use(config.interceptor);
  }

  application.use(bodyParser());
  application.use(deserialize());

  const router = routes();
  application.use(router.routes());
  application.use(router.allowedMethods());

  return application.listen(config.port);
}

export default bootstrap;
