import { describe, expect } from "@jest/globals";
import supertest from "supertest";
import { supabase } from "../server/supabase-client";

describe("server", () => {
  it("health check returns 200", async () => {
    const server = await supabase.from("health").select("id");
    expect(200).toBe(server.status);
  });
});

// describe("address", () => {
//   describe("get address", () => {
//     describe("given the product does not exit", () => {
//       it("should return a 404", () => {
//         expect(true).toBe(true);
//       });
//     });
//   });
// });
