import { Logger } from "winston";
import { Context as CheeketContext } from "@cheeket/koa";

type LoggerContext = CheeketContext & { logger: Logger };

export default LoggerContext;
