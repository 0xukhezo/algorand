import Message from "@/components/Cards/Message";
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

  return (
    <main className="grid grid-cols-5">
      <section className="col-span-4">
        <Component {...pageProps} />{" "}
      </section>
      <section className="flex flex-col px-4 w-[480px] overflow-y-auto">
        {message && <NotificationCard message={message} color={color} />}
        {newChanges &&
          newChanges.map((change: any, index: number) => {
            return (
              <NotificationCard
                message={<Message data={change} />}
                color={color}
                index={index}
                key={index}
              />
            );
          })}
      </section>
    </main>
  );
}
