import supertest from "supertest";
import createRequest from "../create-request";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("GET /ping", () => {
  test("success", async () => {
    const result = await request.get("/ping").expect(200);

    expect(result.text).toEqual("pong");
  });
});
