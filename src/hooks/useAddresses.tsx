import { useEffect, useState } from "react";
import { addressType } from "@/types/types";
import getAddresses from "@/pages/api/getAddresses";

export default function useAddresses() {
  const [addresses, setAddresses] = useState<addressType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/getAddresses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error saiving address: ${errorMessage}`);
        }
        console.log(await response.json(), "get");
        // setAddresses(addresses as addressType[]);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  return { addresses, error, isLoading };
}
