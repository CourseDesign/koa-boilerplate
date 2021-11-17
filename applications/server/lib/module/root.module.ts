import { Module } from "cheeket-koa-module";
import {
  DefaultContext,
  DefaultState,
  Middleware,
  ParameterizedContext,
} from "koa";
import compose from "koa-compose";
import { ContainerContext } from "cheeket-koa";

import { LoggingModule } from "@internal/logging";

import { Dependency } from "../type";

class RootModule implements Module {
  private readonly loggingModule = new LoggingModule(this.dependency);

  constructor(private readonly dependency: Dependency) {}

  modules(): Middleware<DefaultState, DefaultContext & ContainerContext> {
    return compose<ParameterizedContext<DefaultState, ContainerContext>>([
      this.loggingModule.modules(),
    ]);
  }
}

export default RootModule;
