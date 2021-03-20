import { Initializer } from "@cheeket/koa";
import { interfaces } from "cheeket";
import { override } from "@course-design/decorators";
import { LoggerDependencyInitializer } from "./logger";

class DependencyInitializer implements Initializer {
  private readonly loggerDependencyInitializer = new LoggerDependencyInitializer();

  @override
  initRootContainer(container: interfaces.Container): void {
    this.loggerDependencyInitializer.initRootContainer(container);
  }

  @override
  initContextContainer(container: interfaces.Container): void {
    this.loggerDependencyInitializer.initContextContainer(container);
  }
}

export default DependencyInitializer;
