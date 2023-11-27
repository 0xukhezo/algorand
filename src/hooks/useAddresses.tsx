import { useEffect, useState } from "react";
import { accountType } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";
import getAddresses from "@/pages/api/getAddresses";

export default function useAddresses() {
  const [addresses, setAddresses] = useState<accountType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setIsLoading(true);
        const req = { method: "GET" } as NextApiRequest;
        const res = {
          status: (statusCode: number) => ({
            json: (data: any) => {
              if (statusCode === 200) {
                setAddresses(data.data);
              } else {
                setError(data.error || "Error 500");
              }
            },
          }),
        } as NextApiResponse;
        await getAddresses(req, res);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  return { addresses, error, isLoading };
}
