import { Server } from "net";
import Application from "koa";

import Config from "./config";

async function bootstrap(config: Config): Promise<Server> {
  const application = new Application();
  return application.listen(config.port);
}

export default bootstrap;
