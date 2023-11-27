import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../server/supabase-client";

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

      res.status(200).json({ data: data });
      return { data, error };
    } catch (error) {
      res.status(500).json({ error: "Error 500" });
    }
  } else {
    res.status(405).json({ error: "Metod not allowed" });
  }
}
