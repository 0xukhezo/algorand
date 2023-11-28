// React
import { useEffect, useState } from "react";
// Next
import { NextApiRequest, NextApiResponse } from "next";
// Types
import { accountType } from "@/types/types";
// Api
import getAddressByAddress from "@/pages/api/getAddressByAddress";

type useAddressProps = {
  addressToFetch: string;
};

export default function useAddress({ addressToFetch }: useAddressProps) {
  const [address, setAddress] = useState<accountType | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAddresses = async (addressToFetch: string) => {
    try {
      setIsLoading(true);
      const req = {
        method: "GET",
        body: {
          address: addressToFetch,
        },
      } as NextApiRequest;
      const res = {
        status: (statusCode: number) => ({
          json: (data: any) => {
            if (statusCode === 200) {
              setAddress(data.data);
            } else {
              setError(data.error || "Error 500");
            }
          },
        }),
      } as NextApiResponse;
      await getAddressByAddress(req, res);
      setError(null);
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchAddresses(addressToFetch);
  }, []);

  return { address, error, isLoading };
}
