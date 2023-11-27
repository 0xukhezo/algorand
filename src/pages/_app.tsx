import NotificationCard from "@/components/Cards/NotificationCard";
import useAddresses from "@/hooks/useAddresses";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { addresses, refreshAddresses } = useAddresses();
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const updateAddressesPeriodically = async () => {
      try {
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
          throw new Error(`Error saiving address: ${errorMessage}`);
        }

        refreshAddresses();
        setColor("#4ade80");
        setMessage("Data updated successfully");
      } catch (error) {
        setColor("#f87171");
        setMessage("Error updating data");
      }
    };

    if (addresses) updateAddressesPeriodically();

    const intervalId = setInterval(updateAddressesPeriodically, 60000);
    const intervalIdMessage = setInterval(() => setMessage(undefined), 5000);

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalIdMessage);
    };
  }, [isUpdating]);

  useEffect(() => {
    addresses && addresses?.length > 0 && setIsUpdating(true);
  }, [addresses]);

  return (
    <main className="relative">
      {message && <NotificationCard message={message} color={color} />}
      <Component {...pageProps} />
    </main>
  );
}
