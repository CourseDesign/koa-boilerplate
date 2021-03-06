import * as winston from "winston";
import { inContainerScope, interfaces } from "cheeket";
import { Initializer } from "@cheeket/koa";
import {
  loggerProvider,
  fileTransportProvider,
  consoleTransportProvider,
} from "@cheeket/winston";
import { override } from "@util/decorator";

import Token from "./token";

class DependencyInitializer implements Initializer {
  @override
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  initRootContainer(container: interfaces.Container): void {
    container.bind(
      Token.Transport,
      inContainerScope(
        fileTransportProvider({
          filename: "logs/error.log",
          level: "error",
        })
      )
    );
    container.bind(
      Token.Transport,
      inContainerScope(fileTransportProvider({ filename: "logs/combined.log" }))
    );
    if (process.env.NODE_ENV !== "production") {
      container.bind(
        Token.Transport,
        inContainerScope(
          consoleTransportProvider({ format: winston.format.simple() })
        )
      );
    }

    container.bind(
      Token.Logger,
      inContainerScope(
        loggerProvider(Token.Transport, {
          level: process.env.NODE_ENV === "production" ? "info" : "debug",
          format: winston.format.json(),
        })
      )
    );
  }

  @override
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  initContextContainer(container: interfaces.Container): void {}
}

export default DependencyInitializer;
