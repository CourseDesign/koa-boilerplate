import supertest from "supertest";
import { mock } from "@cheeket/koa-mock";

import { bootstrap, ConfigProvider } from "../lib";
import { MockModule } from "./mock";

async function createRequest(): Promise<supertest.SuperTest<supertest.Test>> {
  const mockModule = new MockModule();

  const configProvider = new ConfigProvider({
    port: undefined,
    interceptor: mock(mockModule),
  });
  const server = await bootstrap(configProvider.get());

  return supertest(server);
}

export default createRequest;
