// React
import React from "react";
// Components
import AddressAggregator from "@/components/AddressAggregator/AddressAggregator";
import AddressDisplayer from "./AddressDisplayer";
// Hooks
import useAddresses from "../../hooks/useAddresses";

export default function Watcher() {
  const { addresses, error, isLoading, refreshAddresses } = useAddresses();

  return (
    <main className="mt-[40px] xl:px-20 lg:px-16 md:px-10 sm:px-6 px-4">
      {!error ? (
        <div className="w-full">
          <AddressAggregator refreshAddresses={refreshAddresses} />
          <AddressDisplayer addresses={addresses} isLoading={isLoading} />
        </div>
      ) : (
        <span>Error loading addresses. Reload the page.</span>
      )}
    </main>
  );
}
