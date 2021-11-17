/* eslint-disable no-param-reassign */

import { Server } from "net";
import Application from "koa";
import { Container } from "cheeket";

import Config, { ConfigProvider } from "./config";
import rootRouter from "./router";
import RootModule from "./module";

import { dependency, serialize } from "./middleware";
import InternalTokens from "./internal-tokens";

async function bootstrap(
  config: Config = new ConfigProvider().get()
): Promise<Server> {
  const application = new Application();

  const container = new Container();
  const module = new RootModule(InternalTokens);
  const router = rootRouter();

  application.use(dependency(container));
  application.use(serialize());

  application.use(module.modules());

  application.use(router.routes());
  application.use(router.allowedMethods());

  return application.listen(config.port);
}

export default bootstrap;
