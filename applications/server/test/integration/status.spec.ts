import supertest from "supertest";
import { createRequest } from "../utility";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("GET /status", () => {
  test("success", async () => {
    const result = await request.get("/status").expect(200);
    const { body } = result;

    expect(body.cpu).not.toBeUndefined();
    expect(body.memory).not.toBeUndefined();
    expect(body.resource).not.toBeUndefined();
  });
});
