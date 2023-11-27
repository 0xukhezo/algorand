import AddressCard from "@/components/Cards/AddressCard";
import AddressAggregator from "@/components/AddressAggregator/AddressAggregator";
import Loader from "@/components/Loader/Loader";
import { accountType } from "@/types/types";
import useAddresses from "../hooks/useAddresses";
import { useEffect, useState } from "react";

export default function Home() {
  const { addresses, error, isLoading, refreshAddresses } = useAddresses();
  const [message, setMessage] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const updateAddressesPeriodically = async () => {
      try {
        setMessage("Updating...");
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
        setMessage("Data updated successfully");
      } catch (error) {
        console.log(error);
        setMessage("Error updating data:");
      }
    };

    if (addresses) updateAddressesPeriodically();

    const intervalId = setInterval(updateAddressesPeriodically, 60000);

    setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isUpdating]);

  useEffect(() => {
    addresses && addresses?.length > 0 && setIsUpdating(true);
  }, [addresses]);

  return (
    <main>
      <p>{message}</p>
      {!error ? (
        <div className="mx-20 text-center">
          <h2 className="my-6 text-2xl font-semibold">
            Agregate an address to watcher
          </h2>
          <AddressAggregator refreshAddresses={refreshAddresses} />

          {addresses && addresses?.length > 0 ? (
            <>
              <h2 className="my-6 text-2xl font-semibold">
                All addresses in Watcher
              </h2>
              <section className="grid grid-cols-4 text-center">
                <div></div>
                <div className="col-span-2">Account</div>
                <div>Balance</div>
              </section>
              {!isLoading ? (
                addresses?.map((address: accountType, index: number) => {
                  return (
                    <AddressCard
                      addressInfo={address}
                      key={address.id}
                      index={index}
                    />
                  );
                })
              ) : (
                <section className="flex justify-center">
                  <Loader />
                </section>
              )}
            </>
          ) : !isLoading ? (
            <div className="mt-8">
              Not accounts in watcher. Please enter an account{" "}
            </div>
          ) : (
            <section className="flex justify-center">
              <Loader />
            </section>
          )}
        </div>
      ) : (
        <span>Error loading addresses</span>
      )}
    </main>
  );
}
