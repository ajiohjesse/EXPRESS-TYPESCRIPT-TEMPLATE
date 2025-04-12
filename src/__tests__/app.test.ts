import app from "@/app";
import request from "supertest";
import { describe, it } from "vitest";

describe("GET /health-check", () => {
  it("should return 200", () => {
    request(app)
      .get("/health-check")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});
