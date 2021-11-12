import dotenv from "dotenv";
import path from "path";

import Config from "./config";

if (process.env.NODE_ENV != null) {
  dotenv.config({
    path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
  });
} else {
  dotenv.config();
}

const environmentConfig: Partial<Config> = {};
if (process.env.PORT !== undefined) {
  environmentConfig.port = Number(process.env.PORT);
}

export default environmentConfig;
