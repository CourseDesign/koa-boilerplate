import { local, ModuleManager } from "cheeket-koa-module";

import Dependency from "./dependency";
import LocalLoggingModule from "./local-logging.module";
import GlobalLoggingModule from "./global-logging.module";

class LoggingModule extends ModuleManager {
  constructor(dependency: Dependency) {
    super();

    this.register(new GlobalLoggingModule(dependency));
    this.register(local(new LocalLoggingModule(dependency)));
  }
}

export default LoggingModule;
