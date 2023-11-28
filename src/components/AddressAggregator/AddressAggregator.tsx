import getAddressByAddress from "@/pages/api/getAddressByAddress";
import { accountType } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";
import React, { useEffect, useState } from "react";

type AddressAggregatorProps = {
  refreshAddresses: () => void;
};

export default function AddressAggregator({
  refreshAddresses,
}: AddressAggregatorProps) {
  const [newAddress, setNewAddress] = useState<string | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [address, setAddress] = useState<accountType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddress = (inputAddress: string) => {
    const regex = /^[A-Z0-9]{58}$/;

    if (regex.test(inputAddress) || inputAddress === "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setNewAddress(inputAddress);
  };

  const postData = async () => {
    try {
      const response = await fetch("/api/postAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: newAddress,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error saiving address: ${errorMessage}`);
      }

      setNewAddress("");
      setTimeout(() => {
        refreshAddresses();
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAddresses = async (address: string) => {
      try {
        setIsLoading(true);
        const req = {
          method: "GET",
          body: {
            address: address,
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
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isValid && newAddress) {
      fetchAddresses(newAddress);
    }
  }, [newAddress]);

  return (
    <div className="flex justify-center items-center">
      <div>
        <input
          value={newAddress || ""}
          onChange={(e) => handleAddress(e.target.value)}
          type="text"
          name="fundName"
          id="fundName"
          className={`shadow-input rounded-lg w-[950px] h-[40px] px-5 outline-none border-2 ${
            isValid && address === null ? "border-black" : "border-red-500"
          }`}
          placeholder="QUBJYH3..."
        />
        {!isValid && address === null && (
          <p className="text-red-500 text-sm mt-1">
            Address not valid. Please enter a valid Algorand address.
          </p>
        )}
        {address && (
          <p className="text-red-500 text-sm mt-1">
            Address in the list. Enter other address
          </p>
        )}
      </div>

      {error ? (
        <p className="text-red-500 text-sm mt-1">
          Error in the server. Try later
        </p>
      ) : isLoading ? (
        <p className="bg-green-500 px-8 py-3 rounded-xl mx-10 text-white opacity-50 max-w-[160px]">
          Add address
        </p>
      ) : (
        <button
          className={`bg-green-500 px-8 py-3 rounded-xl mx-10 text-white ${
            !isValid || !newAddress || address ? "opacity-50" : ""
          }`}
          disabled={!isValid || !newAddress || !!address}
          onClick={() => postData()}
        >
          Add address
        </button>
      )}
    </div>
  );
}
