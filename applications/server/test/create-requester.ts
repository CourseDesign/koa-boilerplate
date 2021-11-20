import supertest from "supertest";

import { bootstrap, ConfigProvider } from "../lib";

async function createRequester(): Promise<supertest.SuperTest<supertest.Test>> {
  const configProvider = new ConfigProvider({
    port: undefined,
  });
  const server = await bootstrap(configProvider.get());

  return supertest(server);
}

export default createRequester;
