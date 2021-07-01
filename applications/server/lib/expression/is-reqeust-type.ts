import { Expression } from "koa-logic";

function isRequestType(type: string): Expression<boolean> {
  return (context) => context.request.type === type;
}

export default isRequestType;
