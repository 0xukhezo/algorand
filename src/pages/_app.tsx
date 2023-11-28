import NotificationCard from "@/components/Cards/NotificationCard";
import useAddresses from "@/hooks/useAddresses";
import { supabase } from "@/server/supabase-client";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { addresses, changes } = useAddresses();

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [newChanges, setNewChanges] = useState<any>(undefined);
  const [color, setColor] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      setIsUpdating(true);
    } else {
      setIsUpdating(false);
    }
  }, [addresses]);

  useEffect(() => {
    const updateAddressesPeriodically = async () => {
      try {
        if (addresses) {
          setMessage("Updating...");
          setColor("#4ade80");

          const response = await fetch("/api/updateAddresses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              addresses: addresses,
            }),
          });

          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error saving address: ${errorMessage}`);
          } else {
            setColor("#4ade80");
            setMessage("Data updated successfully");
          }
        }
      } catch (error) {
        setColor("#f87171");
        setMessage("Error updating data");
      }
    };

    if (isUpdating) {
      updateAddressesPeriodically();

      const intervalId = setInterval(updateAddressesPeriodically, 10000);
      const intervalIdMessage = setInterval(() => {
        setMessage(undefined);
      }, 5000);

      return () => {
        clearInterval(intervalId);
        clearInterval(intervalIdMessage);
      };
    }
  }, [isUpdating]);

  useEffect(() => {
    setNewChanges(changes);
    const intervalIdNotification = setInterval(() => {
      setNewChanges(undefined);
    }, 5000);
    return () => {
      clearInterval(intervalIdNotification);
    };
  }, [changes]);

  type MessageProps = {
    data: any;
  };

  const Message = ({ data }: MessageProps) => {
    const {
      address,
      amount,
      assets,
      minBalance,
      pendingRewards,
      rewardBase,
      rewards,
      accountStatus,
      totalAppsOptedIn,
      totalAssetsOptedIn,
      totalCreatedApps,
      totalCreatedAssets,
    } = data;

    return (
      <ul>
        <li>{address.slice(0, 6)}... have a change</li>
        {amount !== 0 && (
          <li className="text-sm ms-4">
            Amount: {amount > 0 ? "+" : ""}
            {amount}
          </li>
        )}
        {assets !== 0 && (
          <li className="text-sm ms-4">
            Assets: {assets > 0 ? "+" : ""}
            {assets}
          </li>
        )}
        {minBalance !== 0 && (
          <li className="text-sm ms-4">
            Min balance: {minBalance > 0 ? "+" : ""}
            {minBalance}
          </li>
        )}
        {pendingRewards !== 0 && (
          <li className="text-sm ms-4">
            Pending Rewards: {pendingRewards > 0 ? "+" : ""}
            {pendingRewards}
          </li>
        )}
        {rewardBase !== 0 && (
          <li className="text-sm ms-4">
            Reward Base: {rewardBase > 0 ? "+" : ""}
            {rewardBase}
          </li>
        )}
        {rewards !== 0 && (
          <li className="text-sm ms-4">
            Rewards: {rewards > 0 ? "+" : ""}
            {rewards}
          </li>
        )}
        {!accountStatus[0] && (
          <li className="text-sm ms-4">Account Status: {accountStatus[1]}</li>
        )}{" "}
        {totalAppsOptedIn !== 0 && (
          <li className="text-sm ms-4">
            Apps Opened: {totalAppsOptedIn > 0 ? "+" : ""}
            {totalAppsOptedIn}
          </li>
        )}{" "}
        {totalAssetsOptedIn !== 0 && (
          <li className="text-sm ms-4">
            Assets Opened: {totalAssetsOptedIn > 0 ? "+" : ""}
            {totalAssetsOptedIn}
          </li>
        )}{" "}
        {totalCreatedApps !== 0 && (
          <li className="text-sm ms-4">
            Created Apps: {totalCreatedApps > 0 ? "+" : ""}
            {totalCreatedApps}
          </li>
        )}{" "}
        {totalCreatedAssets !== 0 && (
          <li className="text-sm ms-4">
            Created Assets: {totalCreatedAssets > 0 ? "+" : ""}
            {totalCreatedAssets}
          </li>
        )}
      </ul>
    );
  };

  return (
    <main className="relative">
      {message && <NotificationCard message={message} color={color} />}
      {newChanges &&
        changes.map((change: any, index: number) => {
          return (
            <NotificationCard
              message={<Message data={change} />}
              color={color}
              index={index}
              key={index}
            />
          );
        })}
      <Component {...pageProps} />
    </main>
  );
}
