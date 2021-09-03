import { DefaultState } from "koa";

import { LoggerState } from "@internal/logger";

type State = DefaultState & LoggerState;

export default State;
