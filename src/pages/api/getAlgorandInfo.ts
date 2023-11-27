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
      res
        .status(200)
        .json({ message: "Algorand data fetched", data: { algorandData } });
      return { algorandData };
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error fetching Algorand Account info", data: {} });
    }
  } else {
    res.status(405).json({ message: "Metod not allowed", data: {} });
  }
}
