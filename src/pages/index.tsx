import AddressCard from "@/components/Cards/AddressCard";
import AddressAggregator from "@/components/AddressAggregator/AddressAggregator";
import Loader from "@/components/Loader/Loader";
import { accountType } from "@/types/types";
import useAddresses from "../hooks/useAddresses";

export default function Home() {
  const { addresses, error, isLoading } = useAddresses();

  return (
    <main>
      <h1>Algorand Code Challenge</h1>

      {isLoading ? (
        <Loader />
      ) : !error ? (
        <div className="mx-20 text-center">
          <h2 className="my-6 text-2xl font-semibold">
            Agregate an address to watcher
          </h2>
          <AddressAggregator />
          <h2 className="my-6 text-2xl font-semibold">
            All addresses in Watcher
          </h2>
          <section className="grid grid-cols-4 text-center">
            <div></div>
            <div className="col-span-2">Address</div>
            <div>Balance</div>
          </section>

          {addresses?.map((address: accountType) => {
            return <AddressCard addressInfo={address} key={address.id} />;
          })}
        </div>
      ) : (
        <span>Error loading address</span>
      )}
    </main>
  );
}
