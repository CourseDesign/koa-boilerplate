import { DefaultState } from "koa";

interface State extends DefaultState {
  requestId: string;
}

export default State;
