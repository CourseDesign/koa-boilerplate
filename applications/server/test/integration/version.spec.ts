import supertest from "supertest";
import { camelCase } from "object-change-case";

import createRequest from "../create-request";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("GET /version", () => {
  test("success", async () => {
    const result = await request.get("/version").expect(200);

    const json = camelCase(result.body) as Record<string, unknown>;
    expect(json.version).toEqual(process.env.npm_package_version);
    expect(typeof json.startTime).toBe("number");
  });
});
