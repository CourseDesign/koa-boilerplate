import { Module, SimpleModule } from "cheeket-koa-module";

import { LoggingModule } from "@internal/koa-logging";

import { Context, Dependency } from "../type";

function rootModule(dependency: Dependency): Module<Context> {
  const module = new SimpleModule<Context>();
  const loggingModule = new LoggingModule(dependency);

  module.use(loggingModule.modules());

  return module;
}
export default rootModule;
