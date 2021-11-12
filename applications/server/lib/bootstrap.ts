/* eslint-disable no-param-reassign */

import Application from "koa";
import { Server } from "net";
import { Container } from "cheeket";
import { dependency } from "cheeket-koa";

import Config, { ConfigProvider } from "./config";

async function bootstrap(config?: Config): Promise<Server> {
  if (config === undefined) {
    config = new ConfigProvider().get();
  }

  const application = new Application();
  const container = new Container();

  application.use(dependency(container));

  return application.listen(config.port);
}

export default bootstrap;
