import { Initializer } from "@cheeket/koa";
import { interfaces } from "cheeket";
import { override } from "@util/decorator";
import { ParameterizedContext } from "koa";
import { LoggerDependencyInitializer } from "./logger";
import { State } from "./middleware";

class DependencyInitializer implements Initializer<State> {
  private readonly loggerDependencyInitializer = new LoggerDependencyInitializer();

  @override
  initRootContainer(container: interfaces.Container): void {
    this.loggerDependencyInitializer.initRootContainer(container);
  }

  @override
  initContextContainer(
    container: interfaces.Container,
    context: ParameterizedContext<State>
  ): void {
    this.loggerDependencyInitializer.initContextContainer(container, context);
  }
}

export default DependencyInitializer;
