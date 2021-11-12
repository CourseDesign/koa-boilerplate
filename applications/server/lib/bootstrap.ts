/* eslint-disable no-param-reassign */

import { Server } from "net";
import Application from "koa";
import { Container } from "cheeket";
import { dependency } from "cheeket-koa";
import { snakeCase, camelCase } from "koa-change-case";
import bodyParser from "koa-bodyparser";
import { request, response } from "koa-position";
import { filter, finalize } from "koa-logic";

import Config, { ConfigProvider } from "./config";
import rootRouter from "./router";
import { isRequestType, isResponseType } from "./expression";

const jsonType = "application/json";

async function bootstrap(config?: Config): Promise<Server> {
  if (config === undefined) {
    config = new ConfigProvider().get();
  }

  const application = new Application();

  const container = new Container();
  const router = rootRouter();

  application.use(dependency(container));
  application.use(
    finalize(filter(isResponseType(jsonType), snakeCase(response("body"))))
  );

  application.use(bodyParser());
  application.use(filter(isRequestType(jsonType), camelCase(request("body"))));

  application.use(router.routes());
  application.use(router.allowedMethods());

  return application.listen(config.port);
}

export default bootstrap;
