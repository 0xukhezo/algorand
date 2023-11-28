import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../server/supabase-client";
import getAlgorandInfo from "./getAlgorandInfo";

export default async function updateAddresses(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { addresses } = req.body;
      for (const addressRow of addresses) {
        const getInfo = {
          method: "GET",
          body: {
            address: addressRow.address,
          },
        } as NextApiRequest;

        const { algorandData }: any = await getAlgorandInfo(getInfo, res);

        await supabase
          .from("Addresses")
          .update([
            {
              address: addressRow.address,
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
          ])
          .eq("address", addressRow.address)
          .select();
      }

      res.status(200).json({ message: "Addresses successfully changed" });
    } catch (error) {
      console.error("Error updating addresses:", error);
      res.status(500).json({ message: "Addresses could not be updated" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
