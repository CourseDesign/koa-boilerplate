import "reflect-metadata";

import { Server } from "net";
import Application from "koa";
import dependency from "@cheeket/koa";
import bodyParser from "koa-bodyparser";
import { camelCase, snakeCase } from "koa-change-case";
import { request, response } from "koa-position";
import uuid from "koa-uuid";
import dotenv from "dotenv";

import DependencyInitializer from "./dependency.initializer";
import router from "./router";
import { logMiddleware } from "./middleware";

dotenv.config();

async function bootstrap(port?: number): Promise<Server> {
  const application = new Application();

  application.use(uuid());

  application.use(
    dependency(new DependencyInitializer(), { maxListeners: 1000 })
  );

  application.use(logMiddleware);

  application.use(bodyParser());
  application.use(camelCase(request("body")));

  application.use(router.routes());
  application.use(router.allowedMethods());

  application.use(snakeCase(response("body")));

  return application.listen(port);
}

export default bootstrap;
