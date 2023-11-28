//React
import React from "react";
// Types
import { accountType } from "@/types/types";
// Components
import AddressCard from "@/components/Cards/AddressCard";
import Loader from "@/components/Loader/Loader";

type AddressDisplayerProps = {
  addresses: accountType[] | null;
  isLoading: boolean;
};

export default function AddressDisplayer({
  addresses,
  isLoading,
}: AddressDisplayerProps) {
  return (
    <main>
      <h2 className="my-6 text-lg font-bold uppercase mt-[60px]">
        Your addresses
      </h2>
      {addresses && addresses?.length > 0 ? (
        <section>
          <section className="grid grid-cols-8 text-start border-b-2 pb-6 text-lg font-medium px-8">
            <div>ID</div>
            <div className="col-span-6">Account</div>
            <div>Balance</div>
          </section>

          {!isLoading ? (
            <section className="overflow-auto h-[700px] px-8">
              {addresses?.map((address: accountType) => {
                return <AddressCard addressInfo={address} key={address.id} />;
              })}
            </section>
          ) : (
            <section className="flex justify-center mt-32">
              <Loader />
            </section>
          )}
        </section>
      ) : !isLoading ? (
        <div className="mt-8">
          Not accounts in watcher. Please enter an account{" "}
        </div>
      ) : (
        <section className="flex justify-center mt-32">
          <Loader />
        </section>
      )}
    </main>
  );
}
