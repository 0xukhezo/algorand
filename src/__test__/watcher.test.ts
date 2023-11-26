import getAddresses from "../pages/api/getAddresses";
import { describe, expect } from "@jest/globals";
import { supabase } from "../server/supabase-client";
import { NextApiRequest, NextApiResponse } from "next";
import getAddressByAddress from "../pages/api/getAddressByAddress";
import postAddress from "../pages/api/postAddress";

describe("server", () => {
  it("health check returns 200", async () => {
    const server = await supabase.from("Addresses").select("id");
    expect(200).toBe(server.status);
  });
});

describe("get addresses", () => {
  describe("all address", () => {
    it("should return a code 200", async () => {
      const req = {
        method: "GET",
      } as NextApiRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as NextApiResponse;

      await getAddresses(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Addresses fetched" });
    });

    it("should return a code 405 handle invalid method", async () => {
      const req = {
        method: "POST",
        body: {
          address: "ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754",
        },
      } as NextApiRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as NextApiResponse;

      await getAddressByAddress(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ error: "Metod not allowed" });
    });
  });
  describe("one address", () => {
    it("should return a code 200", async () => {
      const req = {
        method: "GET",
        body: {
          address: "ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754",
        },
      } as NextApiRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as NextApiResponse;

      await getAddressByAddress(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Address fetched" });
    });
    it("should return a code 500 handle error in GET request", async () => {
      const req = {
        method: "GET",
      } as NextApiRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as NextApiResponse;

      await getAddressByAddress(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
    it("should return a code 405 handle invalid method", async () => {
      const req = {
        method: "POST",
      } as NextApiRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as NextApiResponse;

      await getAddressByAddress(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ error: "Metod not allowed" });
    });
  });
});

describe("post addresses", () => {
  describe("all address", () => {
    it("should return a code 200 if address is not in list", async () => {
      const req = {
        method: "POST",
        body: {
          address: "ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W75S",
        },
      } as NextApiRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as NextApiResponse;

      await postAddress(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Address saved" });
    });
    it("should return a code 400 if address is in list", async () => {
      const req = {
        method: "POST",
        body: {
          address: "ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754",
        },
      } as NextApiRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as NextApiResponse;

      await postAddress(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Address in the list" });
    });
    it("should return a code 500 handle error in POST request", async () => {
      const req = {
        method: "POST",
      } as NextApiRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as NextApiResponse;

      await postAddress(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
    it("should return a code 405 handle invalid method", async () => {
      const req = {
        method: "GET",
      } as NextApiRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as NextApiResponse;

      await postAddress(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ error: "Metod not allowed" });
    });
  });
});
