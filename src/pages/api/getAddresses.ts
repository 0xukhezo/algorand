import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../server/supabase-client";

export default async function getAddresses(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { data } = await supabase.from("Addresses").select("*");

      res.status(200).json({ data: data });
      return { data };
    } catch (error) {
      res.status(500).json({ error: "Error 500" });
    }
  } else {
    res.status(405).json({ error: "Metod not allowed" });
  }
}
