import dotenv from "dotenv";
import {ApplicationConfiguration} from "./bootstrap";

dotenv.config();

const envConfig: Partial<ApplicationConfiguration> = {
  port: process.env.PORT !== undefined ? Number(process.env.PORT) : undefined
}

export default envConfig