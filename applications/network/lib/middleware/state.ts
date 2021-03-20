import { DefaultState } from "koa";

interface State extends DefaultState {
  id: string;
}

export default State;
