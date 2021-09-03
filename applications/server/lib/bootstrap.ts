import "reflect-metadata";

import { Server } from "net";
import Application from "koa";
import koaQs from "koa-qs";
import bodyParser from "koa-bodyparser";
import { camelCase } from "koa-change-case";
import { query, request } from "koa-position";
import requestId from "koa-requestid";
import { filter } from "koa-logic";
import { dependency } from "@cheeket/koa";

import { serialize } from "@internal/koa-serialize";
import { logger } from "@internal/koa-logger";
import { errorHandler } from "@internal/koa-error-handler";
import { isRequestType } from "@internal/koa-expression";

import routes from "./routes";
import { Config } from "./config";

const requestIdHeader = "Request-ID";

const isRequestTypeJson = isRequestType("application/json");

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
  application.use(camelCase(query()));
  application.use(filter(isRequestTypeJson, camelCase(request("body"))));

  const router = routes();
  application.use(router.routes());
  application.use(router.allowedMethods());

  return application.listen(config.port);
}

export default bootstrap;
