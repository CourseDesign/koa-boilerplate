import { DefaultState } from "koa";

import { LoggerState } from "@internal/koa-logger";

type State = DefaultState & LoggerState;

export default State;
