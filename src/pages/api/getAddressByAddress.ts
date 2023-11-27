import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../server/supabase-client";
import getAddresses from "./getAddresses";

export default async function getAddressByAddress(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { address } = req.body;

      let { data, error } = await supabase
        .from("Addresses")
        .select("*")
        .eq("address", address)
        .single();

      res
        .status(200)
        .json({ message: "Address founded in watcher list", data: data });
      return { data, error };
    } catch (error) {
      res.status(500).json({ message: "Error 500", data: {} });
    }
  } else {
    res.status(405).json({ message: "Metod not allowed", data: {} });
  }
}
