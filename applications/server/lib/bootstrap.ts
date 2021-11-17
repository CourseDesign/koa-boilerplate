/* eslint-disable no-param-reassign */

import { Server } from "net";
import Application from "koa";
import { Container } from "cheeket";
import { dependency } from "cheeket-koa";
import { modules } from "cheeket-koa-module";

import Config, { ConfigProvider } from "./config";
import rootRouter from "./router";
import RootModule from "./module";

import { serialize } from "./middleware";

async function bootstrap(
  config: Config = new ConfigProvider().get()
): Promise<Server> {
  const application = new Application();

  const container = new Container();
  const module = new RootModule();
  const router = rootRouter();

  module.configure(container);

  application.use(dependency(container));
  application.use(modules());
  application.use(serialize());

  application.use(router.routes());
  application.use(router.allowedMethods());

  return application.listen(config.port);
}

export default bootstrap;
