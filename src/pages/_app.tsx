// React
import { useEffect, useState } from "react";
// Next
import type { AppProps } from "next/app";
// Components
import Message from "@/components/Cards/Message";
import NotificationCard from "@/components/Cards/NotificationCard";
import Navbar from "@/components/Layout/Navbar";
// Hooks
import useAddresses from "@/hooks/useAddresses";
// Styles
import "@/styles/globals.css";

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
          setColor("#F5F5F5");

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
            setColor("#F5F5F5");
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

      const intervalId = setInterval(updateAddressesPeriodically, 60000);
      const intervalIdMessage = setInterval(() => {
        setMessage(undefined);
      }, 10000);

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
    }, 10000);
    return () => {
      clearInterval(intervalIdNotification);
    };
  }, [changes]);

  return (
    <main>
      <Navbar />
      <section className="grid grid-cols-7 overlow-y-hidden">
        <section className="col-span-5">
          <Component {...pageProps} />{" "}
        </section>
        <section className="notifications flex flex-col px-4 w-[480px] overflow-y-auto h-screen mt-[5px]">
          <h1 className="my-[35px] text-lg font-bold uppercase">
            Notifications
          </h1>
          {message && <NotificationCard message={message} color={color} />}
          {newChanges &&
            newChanges.map((change: any, index: number) => {
              return (
                <NotificationCard
                  message={<Message data={change} />}
                  color={color}
                  index={index}
                  data={change}
                  key={index}
                />
              );
            })}
        </section>
      </section>
    </main>
  );
}
