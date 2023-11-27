import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../server/supabase-client";

export default async function getAddresses(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { data } = await supabase.from("Addresses").select("*");

      res
        .status(200)
        .json({
          message: "Addresses found in the list of observers",
          data: data,
        });
      return { data };
    } catch (error) {
      res
        .status(500)
        .json({ message: "Addresses could not be found", data: {} });
    }
  } else {
    res.status(405).json({ message: "Metod not allowed", data: {} });
  }
}