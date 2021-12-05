/* eslint-disable no-param-reassign */

import { Server } from "net";
import Application from "koa";

import Config, { ConfigProvider } from "./config";
import rootModule from "./module";
import InternalTokens from "./internal-tokens";

async function bootstrap(
  config: Config = new ConfigProvider().get()
): Promise<Server> {
  const application = new Application();

  const module = rootModule(InternalTokens);

  application.use(module.modules());

  return application.listen(config.port);
}

export default bootstrap;
