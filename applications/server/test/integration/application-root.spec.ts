import supertest from "supertest";
import createRequest from "../create-request";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("GET /", () => {
  test("success", async () => {
    await request.get("/").expect(404);
  });
});
