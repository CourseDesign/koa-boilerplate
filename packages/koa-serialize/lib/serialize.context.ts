import { Context as CheeketContext } from "@cheeket/koa";
import { DefaultContext } from "koa";

type SerializeContext = DefaultContext & CheeketContext & { response: unknown };

export default SerializeContext;
