// Supabase Client
import { supabase } from "../../server/supabase-client";
// Next
import { NextApiRequest, NextApiResponse } from "next";
// Api
import getAddressByAddress from "./getAddressByAddress";
import getAlgorandInfo from "./getAlgorandInfo";

export default async function postAddress(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { address } = req.body;

      const regex = /^[A-Z0-9]{58}$/;

      if (!regex.test(address)) {
        res
          .status(400)
          .json({ message: "Address invalid, is not Algorand account" });
        return;
      }

      const getInfo = {
        method: "GET",
        body: {
          address: address,
        },
      } as NextApiRequest;

      const { algorandData }: any = await getAlgorandInfo(getInfo, res);
      const existingAddressDataDB = await getAddressByAddress(getInfo, res);

      if (
        existingAddressDataDB &&
        existingAddressDataDB.data === null &&
        algorandData
      ) {
        await supabase.from("Addresses").insert([
          {
            address: algorandData.address,
            amount: algorandData.amount,
            amountWithoutPendingRewards:
              algorandData["amount-without-pending-rewards"],
            appsTotalSchema: algorandData["apps-total-schema"],
            assets: algorandData.assets,
            minBalance: algorandData["min-balance"],
            pendingRewards: algorandData["pending-rewards"],
            rewardBase: algorandData["reward-base"],
            rewards: algorandData.rewards,
            round: algorandData.round,
            status: algorandData.status,
            totalAppsOptedIn: algorandData["total-apps-opted-in"],
            totalAssetsOptedIn: algorandData["total-assets-opted-in"],
            totalCreatedApps: algorandData["total-created-apps"],
            totalCreatedAssets: algorandData["total-created-assets"],
          },
        ]);
        res.status(200).json({ message: "Address saved" });
      } else {
        res.status(400).json({ message: "Address in the list" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error listing the account in the watcher list",
      });
    }
  } else {
    res.status(405).json({ message: "Metod not allowed", data: {} });
  }
}
