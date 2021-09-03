import { Logger } from "winston";
import { Context as CheeketContext } from "@cheeket/koa";
import { DefaultContext } from "koa";

type LoggerContext = DefaultContext & CheeketContext & { logger: Logger };

export default LoggerContext;
