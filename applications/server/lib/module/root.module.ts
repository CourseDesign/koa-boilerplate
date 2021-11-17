import { ModuleManager } from "cheeket-koa-module";

import { LoggingModule } from "@internal/logging";

import InternalTokens from "../internal-tokens";

class RootModule extends ModuleManager {
  constructor() {
    super();

    this.register(new LoggingModule(InternalTokens));
  }
}

export default RootModule;
