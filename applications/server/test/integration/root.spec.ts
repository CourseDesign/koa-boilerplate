import supertest from "supertest";
import createRequester from "../create-requester";

let requester: supertest.SuperTest<supertest.Test>;

beforeEach(async () => {
  requester = await createRequester();
});

describe("GET /", () => {
  test("success", async () => {
    const response = await requester.get("/");

    expect(response.status).toEqual(404);
  });
});
