import { Expression } from "koa-logic";

function isResponseType(type: string): Expression<boolean> {
  return (context) => context.type === type;
}

export default isResponseType;
