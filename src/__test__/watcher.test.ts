// Jest
import { describe, expect } from "@jest/globals";
// Supabase Client
import { supabase } from "../server/supabase-client";
// Next
import { NextApiRequest, NextApiResponse } from "next";
// Api
import getAddresses from "../pages/api/getAddresses";
import getAddressByAddress from "../pages/api/getAddressByAddress";
import postAddress from "../pages/api/postAddress";
import updateAddresses from "../pages/api/updateAddresses";

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
      expect(res.json).toHaveBeenCalledWith({
        message: "Metod not allowed",
        data: {},
      });
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
      expect(res.json).toHaveBeenCalledWith({
        message: "Metod not allowed",
        data: {},
      });
    });
  });
});

describe("post addresses", () => {
  it("should return a code 200 if address is not in list", async () => {
    const req = {
      method: "POST",
      body: {
        address: "A2LUYB4WU45SMY5XAK3NHBFIOYVW6FM7URE22UNGP4P3TPAAPMUDH4RTFU",
      },
    } as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await postAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
  it("should return a code 400 if address is not algorand account", async () => {
    const req = {
      method: "POST",
      body: {
        address: "B26ZXDB35QAFVCJJB3ZC5WO2UDBW7LVIO6MB35HLQDHSN6IGVQEYKIXVPa",
      },
    } as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await postAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Address invalid, is not Algorand account",
    });
  });
  it("should return a code 400 if address is in list", async () => {
    const req = {
      method: "POST",
      body: {
        address: "B26ZXDB35QAFVCJJB3ZC5WO2UDBW7LVIO6MB35HLQDHSN6IGVQEYKIXVPE",
      },
    } as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await postAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Address in the list",
    });
  });
  it("should return a code 400 if address don't exits in Algorand API", async () => {
    const req = {
      method: "POST",
      body: {
        address: "B26ZXDB35QAFVCJJB3ZC5WO2UDBW7LVIO6MB35HLQDHSN6IGVQEYKIAAAA",
      },
    } as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await postAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error fetching Algorand Account info",
      data: {},
    });
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
    expect(res.json).toHaveBeenCalledWith({
      message: "Error listing the account in the watcher list",
    });
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
    expect(res.json).toHaveBeenCalledWith({
      message: "Metod not allowed",
      data: {},
    });
  });
});

describe("update addresses", () => {
  it("should return a code 200", async () => {
    const reqGet = {
      method: "GET",
    } as NextApiRequest;
    const resGet = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    const resPut = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    const { data }: any = await getAddresses(reqGet, resGet);

    const reqPUT = {
      method: "POST",
      body: {
        addresses: data,
      },
    } as NextApiRequest;

    await updateAddresses(reqPUT, resPut);

    expect(resGet.status).toHaveBeenCalledWith(200);
    expect(resPut.status).toHaveBeenCalledWith(200);
  });
});
