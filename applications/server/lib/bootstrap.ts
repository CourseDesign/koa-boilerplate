import "reflect-metadata";

import { Server } from "net";
import { Container } from "cheeket";
import { dependency } from "@cheeket/koa";
import Application from "koa";
import koaQs from "koa-qs";
import bodyParser from "koa-bodyparser";
import { camelCase, snakeCase } from "koa-change-case";
import { query, request, response } from "koa-position";
import requestId from "koa-requestid";
import serialize from "koa-serialize";
import expose from "koa-expose";

import routes from "./routes";
import { logger } from "./module";

export interface ApplicationConfiguration {
  port?: number;
  container?: Container;
}

async function bootstrap(config: ApplicationConfiguration): Promise<Server> {
  const application = new Application();

  koaQs(application);

  application.use(requestId());

  application.use(dependency(config.container));

  application.use(logger());

  application.use(bodyParser());
  application.use(camelCase(query()));
  application.use(camelCase(request("body")));

  const router = routes();
  application.use(router.routes());
  application.use(router.allowedMethods());

  application.use(serialize(response("body")));
  application.use(snakeCase(response("body")));
  application.use(expose(query("fields")));

  return application.listen(config.port);
}

export default bootstrap;
