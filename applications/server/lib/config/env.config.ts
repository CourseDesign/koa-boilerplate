import dotenv from "dotenv";
import path from "path";
import Config from "./config";

if (process.env.NODE_ENV != null) {
  dotenv.config({
    path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
  });
}
dotenv.config();

const envConfig: Partial<Config> = {
  port: process.env.PORT !== undefined ? Number(process.env.PORT) : undefined,
};

export default envConfig;
