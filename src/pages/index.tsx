import AddressCard from "@/components/Cards/AddressCard";
import AddressAggregator from "@/components/Input/AddressAggregator";
import Loader from "@/components/Loader/Loader";
import { addressType } from "@/types/types";
import useAddresses from "../hooks/useAddresses";

export default function Home() {
  const { addresses, error, isLoading } = useAddresses();
  console.log(addresses);
  return (
    <main>
      <h1>Algorand Code Challenge</h1>
      <h2>All addresses in Watcher</h2>
      <AddressAggregator />
      {isLoading ? (
        <Loader />
      ) : !error ? (
        <div>
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
