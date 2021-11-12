import supertest from "supertest";

import { bootstrap, ConfigProvider } from "../lib";

async function createRequest(): Promise<supertest.SuperTest<supertest.Test>> {
  const configProvider = new ConfigProvider({
    port: undefined,
  });
  const server = await bootstrap(configProvider.get());

  return supertest(server);
}

export default createRequest;
