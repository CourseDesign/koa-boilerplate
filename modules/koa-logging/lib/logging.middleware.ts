import { DefaultState, Middleware } from "koa";

import Context from "./context";
import Dependency from "./dependency";
import DefaultDependency from "./default-dependency";
import LoggingModule from "./logging.module";

function logging(
  dependency: Dependency = DefaultDependency
): Middleware<DefaultState, Context> {
  const module = new LoggingModule(dependency);

  return module.modules;
}

export default logging;