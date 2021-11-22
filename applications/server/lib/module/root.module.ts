import { Module, SimpleModule } from "cheeket-koa-module";

import { LoggingModule } from "@internal/logging";

import { Dependency } from "../type";

function rootModule(dependency: Dependency): Module {
  const module = new SimpleModule();

  const loggingModule = new LoggingModule(dependency);

  module.use(loggingModule.modules());

  return module;
}

export default rootModule;
