import { Module, SimpleModule } from "cheeket-koa-module";

import serialize from "@internal/koa-serialize";
import logging from "@internal/koa-logging";

import { Context, Dependency } from "../type";

function rootModule(dependency: Dependency): Module<Context> {
  const module = new SimpleModule<Context>();

  module.use(serialize());
  module.use(logging(dependency));

  return module;
}
export default rootModule;
