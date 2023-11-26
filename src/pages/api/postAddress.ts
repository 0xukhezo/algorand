import { supabase } from "../../server/supabase-client";
import { NextApiRequest, NextApiResponse } from "next";
import getAddressByAddress from "./getAddressByAddress";

export default async function postAddress(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { address } = req.body;

      const getInfo = {
        method: "GET",
        body: {
          address: address,
        },
      } as NextApiRequest;
      const existingAddressData = await getAddressByAddress(getInfo, res);

      if (existingAddressData && existingAddressData.data !== null) {
        res.status(400).json({ error: "Address in the list" });
      } else {
        await supabase.from("Addresses").insert([{ address, balance: 0 }]);

        res.status(200).json({ message: "Address saved" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error 500" });
    }
  } else {
    res.status(405).json({ error: "Metod not allowed" });
  }
}
