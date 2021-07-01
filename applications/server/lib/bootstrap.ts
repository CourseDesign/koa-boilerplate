import "reflect-metadata";

import { Server } from "net";
import Application from "koa";
import koaQs from "koa-qs";
import bodyParser from "koa-bodyparser";
import { camelCase } from "koa-change-case";
import { query, request } from "koa-position";
import requestId from "koa-requestid";
import { filter, finalize } from "koa-logic";
import { dependency } from "@cheeket/koa";

import routes from "./routes";
import { RootSerializer, logger, serialize, error } from "./module";
import { Config } from "./config";
import { isRequestType } from "./expression";

const requestIdHeader = "Request-ID";

const isRequestTypeJson = isRequestType("application/json");

async function bootstrap(config: Config): Promise<Server> {
  const application = new Application();

  koaQs(application);

  application.use(finalize(serialize(new RootSerializer())));

  application.use(
    requestId({ expose: requestIdHeader, header: requestIdHeader })
  );

  application.use(dependency(config.container));

  application.use(logger());
  application.use(error());

  application.use(bodyParser());
  application.use(camelCase(query()));
  application.use(filter(isRequestTypeJson, camelCase(request("body"))));

  const router = routes();
  application.use(router.routes());
  application.use(router.allowedMethods());

  return application.listen(config.port);
}

export default bootstrap;
