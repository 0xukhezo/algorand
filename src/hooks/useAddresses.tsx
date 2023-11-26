import { useEffect, useState } from "react";
import { addressType } from "@/types/types";
import { getAddresses } from "@/pages/api/address";

export default function useAddresses() {
  const [addresses, setAddresses] = useState<addressType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setIsLoading(true);

        const { addresses, error } = await getAddresses();

        if (error) {
          setError(error.message);
        }

        setAddresses(addresses as addressType[]);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  return { addresses, error, isLoading };
}
