import { ApplicationConfiguration } from "./bootstrap";
import envConfig from "./env-config";

class ConfigurationProvider {
  private readonly config: ApplicationConfiguration;

  constructor(config: Partial<ApplicationConfiguration>) {
    this.config = {
      port: config.port ?? envConfig.port,
      container: config.container ?? envConfig.container,
    };
  }

  get(): ApplicationConfiguration {
    return this.config;
  }
}

export default ConfigurationProvider;
