import { ConfigBuilder, JsonSource } from "conev-sync";
import Config from "./config";
import defaultConfig from "./default.config";
import environmentConfig from "./environment.config";

class ConfigProvider {
  constructor(private readonly overrides: Partial<Config> = {}) {}

  get(): Config {
    const source = new JsonSource();

    source
      .set("default", defaultConfig)
      .set("environment", environmentConfig)
      .set("overrides", this.overrides);

    const builder = new ConfigBuilder();

    builder.addEnv("default", "environment", "overrides");
    builder.addSource(source);

    return builder.build().get() as Config;
  }
}

export default ConfigProvider;
