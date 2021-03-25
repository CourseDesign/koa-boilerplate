import supertest from "supertest";
import createRequest from "../create-request";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("GET /version", () => {
  test("success", async () => {
    const result = await request.get("/version").expect(200);

    expect(result.body.version).toEqual(process.env.npm_package_version);
  });
});
