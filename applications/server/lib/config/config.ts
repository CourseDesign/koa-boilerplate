import { Container } from "cheeket";

import { LoggerModuleConfig } from "../module";

interface Config {
  port?: number;
  container?: Container;
  logger?: LoggerModuleConfig;
}

export default Config;
