import { Initializer } from "@cheeket/koa";
import { interfaces } from "cheeket";

class DependencyInitializer implements Initializer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  initRootContainer(container: interfaces.Container): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  initContextContainer(container: interfaces.Container): void {}
}

export default DependencyInitializer;
