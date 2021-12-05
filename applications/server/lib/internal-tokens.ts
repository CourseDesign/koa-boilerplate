import Dependency from "./type/dependency";

import { DefaultDependency as LoggerDefaultDependency } from "@internal/koa-logging";

const InternalTokens: Dependency = Object.freeze({
  ...LoggerDefaultDependency,
});

export default InternalTokens;
