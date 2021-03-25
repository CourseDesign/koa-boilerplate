import "reflect-metadata";

import { Server } from "net";
import Application from "koa";
import dependency from "@cheeket/koa";
import koaQs from "koa-qs";
import bodyParser from "koa-bodyparser";
import { camelCase, snakeCase } from "koa-change-case";
import { query, request, response } from "koa-position";
import requestId from "koa-requestid";
import serialize from "koa-serialize";
import expose from "koa-expose";
import dotenv from "dotenv";

import DependencyInitializer from "./dependency.initializer";
import router from "./router";
import { logMiddleware } from "./middleware";

dotenv.config();

async function bootstrap(port?: number): Promise<Server> {
  const application = new Application();

  koaQs(application);

  application.use(requestId());

  application.use(
    dependency(new DependencyInitializer(), { maxListeners: 1000 })
  );

  application.use(logMiddleware);

  application.use(bodyParser());
  application.use(camelCase(query()));
  application.use(camelCase(request("body")));

  application.use(router.routes());
  application.use(router.allowedMethods());

  application.use(serialize(response("body")));
  application.use(expose(query("fields")));
  application.use(snakeCase(response("body")));

  return application.listen(port);
}

export default bootstrap;
