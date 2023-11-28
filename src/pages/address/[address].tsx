// React
import React from "react";
// Next
import { useRouter } from "next/router";
// Components
import AccountDetails from "@/components/Sections/AccountDetails";
import Loader from "@/components/Loader/Loader";
// Hooks
import useAddress from "@/hooks/useAddress";

export default function AddressDetails() {
  const router = useRouter();
  const { address, error, isLoading } = useAddress({
    addressToFetch: router.query.address as string,
  });

  return (
    <>
      {address ? (
        <AccountDetails address={address} error={error} isLoading={isLoading} />
      ) : (
        <Loader />
      )}
    </>
  );
}
