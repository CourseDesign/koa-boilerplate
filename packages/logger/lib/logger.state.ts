import { DefaultState } from "koa";

interface LoggerState extends DefaultState {
  id: string;
}

export default LoggerState;
