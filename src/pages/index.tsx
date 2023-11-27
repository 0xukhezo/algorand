import AddressCard from "@/components/Cards/AddressCard";
import AddressAggregator from "@/components/AddressAggregator/AddressAggregator";
import Loader from "@/components/Loader/Loader";
import { addressType } from "@/types/types";
import useAddresses from "../hooks/useAddresses";

export default function Home() {
  const { addresses, error, isLoading } = useAddresses();

  return (
    <main>
      <h1>Algorand Code Challenge</h1>
      <h2>All addresses in Watcher</h2>
      <AddressAggregator />
      {isLoading ? (
        <Loader />
      ) : !error ? (
        <div className="mx-20">
          <section className="grid grid-cols-4 text-center">
            <div></div>
            <div className="col-span-2">Address</div>
            <div>Balance</div>
          </section>
          {addresses?.map((address: addressType) => {
            return <AddressCard addressInfo={address} key={address.id} />;
          })}
        </div>
      ) : (
        <span>Error loading address</span>
      )}
    </main>
  );
}
