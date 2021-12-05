/* eslint-disable no-param-reassign */

import { Server } from "net";
import Application from "koa";

import Config, { ConfigProvider } from "./config";
import { serialize } from "./middleware";
import rootRouter from "./router";
import rootModule from "./module";
import InternalTokens from "./internal-tokens";

async function bootstrap(
  config: Config = new ConfigProvider().get()
): Promise<Server> {
  const application = new Application();

  const module = rootModule(InternalTokens);
  const router = rootRouter();

  application.use(serialize());

  application.use(module.modules());

  application.use(router.routes());
  application.use(router.allowedMethods());

  return application.listen(config.port);
}

export default bootstrap;
