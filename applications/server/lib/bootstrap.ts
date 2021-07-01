import "reflect-metadata";

import { Server } from "net";
import Application from "koa";
import koaQs from "koa-qs";
import bodyParser from "koa-bodyparser";
import { camelCase, snakeCase } from "koa-change-case";
import { query, request, response } from "koa-position";
import requestId from "koa-requestid";
import serialize from "koa-serialize";
import expose from "koa-expose";
import { filter, finalize } from "koa-logic";
import compose from "koa-compose";
import { dependency } from "@cheeket/koa";

import routes from "./routes";
import { logger } from "./module";
import { Config } from "./config";
import { isRequestType, isResponseType } from "./expression";

const requestIdHeader = "Request-ID";

const isRequestTypeJson = isRequestType("application/json");
const isResponseTypeJson = isResponseType("application/json");

async function bootstrap(config: Config): Promise<Server> {
  const application = new Application();

  koaQs(application);

  application.use(
    requestId({ expose: requestIdHeader, header: requestIdHeader })
  );

  application.use(dependency(config.container));

  application.use(logger());

  application.use(bodyParser());
  application.use(camelCase(query()));
  application.use(filter(isRequestTypeJson, camelCase(request("body"))));

  const serializeBody = filter(
    isResponseTypeJson,
    compose([
      serialize(response("body")),
      snakeCase(response("body")),
      expose(query("fields")),
    ])
  );

  application.use(finalize(serializeBody));

  const router = routes();
  application.use(router.routes());
  application.use(router.allowedMethods());

  return application.listen(config.port);
}

export default bootstrap;
