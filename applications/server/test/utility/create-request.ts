import supertest from "supertest";
import { mock, Mocker } from "@cheeket/koa-mock";

import { bootstrap, ConfigProvider } from "../../lib";

async function createRequest(): Promise<supertest.SuperTest<supertest.Test>> {
  const mocker = new Mocker();

  const configProvider = new ConfigProvider({
    port: undefined,
    interceptor: mock(mocker),
  });
  const server = await bootstrap(configProvider.get());

  return supertest(server);
}

export default createRequest;
