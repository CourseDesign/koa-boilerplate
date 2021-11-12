/* eslint-disable no-param-reassign */

import { Server } from "net";
import Application from "koa";

import Config, { ConfigProvider } from "./config";

async function bootstrap(config?: Config): Promise<Server> {
  if (config === undefined) {
    config = new ConfigProvider().get();
  }

  const application = new Application();
  return application.listen(config.port);
}

export default bootstrap;
