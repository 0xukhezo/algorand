import { useEffect, useState } from "react";
import { accountType } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";
import getAddresses from "@/pages/api/getAddresses";

export default function useAddresses() {
  const [addresses, setAddresses] = useState<accountType[] | null>(null);
  const [prevAddresses, setPrevAddresses] = useState<accountType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [changes, setChanges] = useState<any>([]);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const req = { method: "GET" } as NextApiRequest;
      const res = {
        status: (statusCode: number) => ({
          json: (data: any) => {
            if (statusCode === 200) {
              setAddresses(data.data);
            } else {
              setError(data.error || "Error 500");
            }
          },
        }),
      } as NextApiResponse;
      await getAddresses(req, res);
      setError(null);
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
    const intervalId = setInterval(fetchAddresses, 10500);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (addresses && addresses?.length > 0) {
      setPrevAddresses(addresses);
      const notificationsChanges = addresses
        .map((account: any, index: number) => {
          const addressData = prevAddresses && prevAddresses[index];
          if (addressData) {
            return {
              address: account.address,
              amount: (account.amount - addressData.amount) / 1000000,
              amountWithoutPendingRewards:
                (account.amountWithoutPendingRewards -
                  addressData.amountWithoutPendingRewards) /
                1000000,
              assets: account.assets.length - addressData.assets.length,
              minBalance:
                (account.minBalance - addressData.minBalance) / 1000000,
              pendingRewards:
                (account.pendingRewards - addressData.pendingRewards) / 1000000,
              rewardBase:
                (account.rewardBase - addressData.rewardBase) / 1000000,
              rewards: (account.rewards - addressData.rewards) / 1000000,
              round: (account.round - addressData.round) / 1000000,
              accountStatus: [
                account.status === addressData.status,
                account.status,
              ],
              totalAppsOptedIn:
                account.totalAppsOptedIn - addressData.totalAppsOptedIn,
              totalAssetsOptedIn:
                account.totalAssetsOptedIn - addressData.totalAssetsOptedIn,
              totalCreatedApps:
                account.totalCreatedApps - addressData.totalCreatedApps,
              totalCreatedAssets:
                account.totalCreatedAssets - addressData.totalCreatedAssets,
            };
          }
          return null;
        })
        .filter((result: any) => result !== null) as Array<{
        address: string;
        amount: number;
      }>;
      const notificationsfiltered = notificationsChanges.filter(
        (notification) => {
          return notification.amount !== 0;
        }
      );

      setChanges(notificationsfiltered);
    }
  }, [addresses]);

  const refreshAddresses = () => {
    fetchAddresses();
  };

  return { addresses, error, isLoading, refreshAddresses, changes };
}
