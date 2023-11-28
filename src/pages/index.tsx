// React
import React from "react";
// Types
import { accountType } from "@/types/types";
// Components
import AddressCard from "@/components/Cards/AddressCard";
import AddressAggregator from "@/components/AddressAggregator/AddressAggregator";
import Loader from "@/components/Loader/Loader";
// Hooks
import useAddresses from "../hooks/useAddresses";

export default function Home() {
  const { addresses, error, isLoading, refreshAddresses } = useAddresses();

  return (
    <main className="mt-[40px] px-20">
      {!error ? (
        <div className="w-full">
          <h2 className="mb-6 text-lg font-bold uppercase">
            Agregate an address to watcher
          </h2>
          <AddressAggregator refreshAddresses={refreshAddresses} />

          {addresses && addresses?.length > 0 ? (
            <section className="mt-[60px]">
              <h2 className="my-6 text-lg font-bold uppercase">
                Your addresses
              </h2>
              <section className="grid grid-cols-8 text-start border-b-2 pb-6 text-lg font-medium px-8">
                <div>ID</div>
                <div className="col-span-6">Account</div>
                <div>Balance</div>
              </section>

              {!isLoading ? (
                <section className="overflow-auto h-[700px] px-8">
                  {addresses?.map((address: accountType) => {
                    return (
                      <AddressCard addressInfo={address} key={address.id} />
                    );
                  })}
                </section>
              ) : (
                <section className="flex justify-center">
                  <Loader />
                </section>
              )}
            </section>
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
