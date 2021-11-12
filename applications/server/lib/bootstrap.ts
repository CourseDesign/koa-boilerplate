/* eslint-disable no-param-reassign */

import { Server } from "net";
import Application from "koa";
import { Container } from "cheeket";
import { dependency } from "cheeket-koa";

import Config, { ConfigProvider } from "./config";
import rootRouter from "./router";
import { serialize } from "./middleware";

async function bootstrap(config?: Config): Promise<Server> {
  if (config === undefined) {
    config = new ConfigProvider().get();
  }

  const application = new Application();

  const container = new Container();
  const router = rootRouter();

  application.use(dependency(container));
  application.use(serialize());

  application.use(router.routes());
  application.use(router.allowedMethods());

  return application.listen(config.port);
}

export default bootstrap;
