import { bindObject, Container, inContainerScope } from "cheeket";
import { Module } from "cheeket-koa-module";

import Dependency from "./dependency";

class LocalLoggingModule implements Module {
  private readonly localLoggerProvider = inContainerScope(async (context) => {
    const globalLogger = await context.resolve(this.dependency.GlobalLogger);
    const requestId = await context.resolve(this.dependency.RequestId);

    return globalLogger.child({ requestId });
  }, bindObject());

  constructor(private readonly dependency: Dependency) {}

  configure(container: Container): void {
    container.register(this.dependency.LocalLogger, this.localLoggerProvider);
  }
}

export default LocalLoggingModule;
