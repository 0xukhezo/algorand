import AddressCard from "@/components/Cards/AddressCard";
import AddressAggregator from "@/components/AddressAggregator/AddressAggregator";
import Loader from "@/components/Loader/Loader";
import { accountType } from "@/types/types";
import useAddresses from "../hooks/useAddresses";

export default function Home() {
  const { addresses, error, isLoading, refreshAddresses } = useAddresses();

  return (
    <main className="border-r-1 h-screen pt-[60px]">
      {!error ? (
        <div className="w-full text-center">
          <h2 className="my-6 text-3xl">Agregate an address to watcher</h2>
          <AddressAggregator refreshAddresses={refreshAddresses} />

          {addresses && addresses?.length > 0 ? (
            <>
              <h2 className="my-6 text-3xl">All addresses in Watcher</h2>
              <section className="grid grid-cols-4 text-center border-b-4 pb-6 text-lg font-medium">
                <div>ID</div>
                <div className="col-span-2">Account</div>
                <div>Balance</div>
              </section>

              {!isLoading ? (
                <section className="overflow-auto h-[700px]">
                  {addresses?.map((address: accountType, index: number) => {
                    return (
                      <AddressCard
                        addressInfo={address}
                        key={address.id}
                        index={index}
                      />
                    );
                  })}
                </section>
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
