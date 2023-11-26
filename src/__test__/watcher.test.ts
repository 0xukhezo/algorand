import { getAddresses } from "../pages/api/address";
import { describe, expect } from "@jest/globals";
import { supabase } from "../server/supabase-client";

describe("server", () => {
  it("health check returns 200", async () => {
    const server = await supabase.from("Health").select("id");
    expect(200).toBe(server.status);
  });
});

describe("address", () => {
  describe("get addresses", () => {
    describe("return all address", () => {
      it("should return a array with length greater than 0", async () => {
        const { addresses } = await getAddresses();
        expect(addresses?.length).toBeGreaterThan(0);
      });
      it("should return a object with properties as addressType {  id: number; created_at: string; balance: number; address: string;}", async () => {
        const { addresses } = await getAddresses();
        expect(addresses && addresses[0]).toEqual({
          id: 1,
          created_at: "2023-11-26T17:40:44+00:00",
          balance: 0,
          address: null,
        });
      });
    });
  });
});
