import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function getAlgorandInfo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { address } = req.body;
      const algorandResponse = await axios.get(
        `https://mainnet-api.algonode.cloud/v2/accounts/${address}`
      );
      const algorandData = algorandResponse.data;
      res.status(200).json({ message: "Algorand data fetched" });
      return { algorandData };
    } catch (error) {
      res.status(400).json({ error: "Error fetching Algorand Account info" });
    }
  } else {
    res.status(405).json({ error: "Metod not allowed" });
  }
}
