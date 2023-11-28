// React
import React from "react";
// Components
import AddressAggregator from "@/components/AddressAggregator/AddressAggregator";
// Hooks
import useAddresses from "../../hooks/useAddresses";
import AddressDisplayer from "./AddressDisplayer";

export default function Watcher() {
  const { addresses, error, isLoading, refreshAddresses } = useAddresses();

  return (
    <main className="mt-[40px] px-20">
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
