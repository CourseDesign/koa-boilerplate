import * as winston from "winston";
import { inContainerScope, interfaces } from "cheeket";
import { Initializer } from "@cheeket/koa";
import { loggerProvider } from "@cheeket/winston";
import { override } from "@util/decorator";

import Token from "./token";

class DependencyInitializer implements Initializer {
  @override
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  initRootContainer(container: interfaces.Container): void {
    container.bind(
      Token.Logger,
      inContainerScope(
        loggerProvider({
          level: process.env.NODE_ENV === "production" ? "info" : "debug",
          format: winston.format.json(),
          transports: [
            new winston.transports.File({
              filename: "logs/error.log",
              level: "error",
            }),
            new winston.transports.File({ filename: "logs/combined.log" }),
          ],
        })
      )
    );
  }

  @override
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  initContextContainer(container: interfaces.Container): void {}
}

export default DependencyInitializer;
