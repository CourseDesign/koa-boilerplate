import { DefaultState } from "koa";
import { LoggerState } from "@internnal/logger";

type State = DefaultState & LoggerState;

export default State;
