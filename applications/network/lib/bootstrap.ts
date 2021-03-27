import "reflect-metadata";

import { Server } from "net";
import { Container, interfaces } from "cheeket";
import dependency from "@cheeket/koa";
import Application from "koa";
import koaQs from "koa-qs";
import bodyParser from "koa-bodyparser";
import { camelCase, snakeCase } from "koa-change-case";
import { query, request, response } from "koa-position";
import requestId from "koa-requestid";
import serialize from "koa-serialize";
import expose from "koa-expose";
import dotenv from "dotenv";

import router from "./router";
import token from "./token";
import { logger } from "./middleware";

dotenv.config();

async function bootstrap(
  port?: number,
  container?: interfaces.Container
): Promise<Server> {
  const application = new Application();

  koaQs(application);

  application.use(requestId());

  application.use(
    dependency(container ?? new Container(), { maxListeners: 1000 })
  );

  application.use(logger(token));

  application.use(bodyParser());
  application.use(camelCase(query()));
  application.use(camelCase(request("body")));

  application.use(router.routes());
  application.use(router.allowedMethods());

  application.use(serialize(response("body")));
  application.use(snakeCase(response("body")));
  application.use(expose(query("fields")));

  return application.listen(port);
}

export default bootstrap;
