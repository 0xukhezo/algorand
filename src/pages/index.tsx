import useAddresses from "../../hooks/useAddresses";

export default function Home() {
  const { addresses, error, isLoading } = useAddresses();

  return (
    <main>
      <h1>Algorand Code Challenge</h1>
    </main>
  );
}
