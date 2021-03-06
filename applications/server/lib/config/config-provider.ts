import { ConfigBuilder, JsonSource, Config as ConevConfig } from "conev-sync";
import { isPlainObject } from "is-plain-object";
import cleanDeep from "clean-deep";

import Config from "./config";
import envConfig from "./env.config";
import defaultConfig from "./default.config";

class ConfigProvider {
  private readonly config: ConevConfig;

  constructor(config?: Partial<Config>) {
    const jsonSource = new JsonSource();

    jsonSource
      .set("default", cleanDeep(defaultConfig))
      .set("env", cleanDeep(envConfig))
      .set("custom", config ?? {});

    const builder = new ConfigBuilder();

    builder
      .addSource(jsonSource)
      .addEnv("default", "env", "custom")
      .setOptions({ isMergeableObject: isPlainObject });

    this.config = builder.build();
  }

  get(): Config {
    return this.config.get() as Config;
  }
}

export default ConfigProvider;
