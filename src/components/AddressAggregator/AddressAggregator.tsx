// React
import React, { useEffect, useState } from "react";
// Next
import { NextApiRequest, NextApiResponse } from "next";
// Types
import { accountType } from "@/types/types";
// Api
import getAddressByAddress from "@/pages/api/getAddressByAddress";

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
                setError(data.error);
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
  console.log(error);
  return (
    <div className="flex  items-center">
      <div>
        <div className="flex">
          <input
            value={newAddress || ""}
            onChange={(e) => handleAddress(e.target.value)}
            type="text"
            name="fundName"
            id="fundName"
            className={`shadow-input text-sm rounded-l-xl w-[700px] py-3 px-5 outline-none bg-gray-100 placeholder:text-gray-600 ${
              isValid && address === null ? "" : "border-red-500 border-1"
            }`}
            placeholder="Write your address QUBJYH3..."
          />
          {error ? (
            <p className="bg-blue-500 px-8 py-3 rounded-r-xl text-white opacity-50 max-w-[160px]">
              Add address
            </p>
          ) : isLoading ? (
            <p className="bg-blue-500 px-8 py-3 rounded-r-xl text-white opacity-50 max-w-[160px]">
              Add address
            </p>
          ) : (
            <button
              className={`bg-blue-500 px-8 py-3 rounded-r-xl text-white ${
                !isValid || !newAddress || address ? "opacity-50" : ""
              }`}
              disabled={!isValid || !newAddress || !!address}
              onClick={() => postData()}
            >
              Add address
            </button>
          )}
        </div>

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
        {error && (
          <p className="text-red-500 text-sm mt-1">
            Error in the server. Try later
          </p>
        )}
      </div>
    </div>
  );
}
