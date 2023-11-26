import React, { useState } from "react";

export default function AddressAggregator() {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleAddress = (inputAddress: string) => {
    const regex = /^[A-Z0-9]{58}$/;

    if (regex.test(inputAddress) || inputAddress === "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setAddress(inputAddress);
  };

  return (
    <div>
      <span className="mr-[12px]">Algorand address</span>
      <input
        value={address || ""}
        onChange={(e) => handleAddress(e.target.value)}
        type="text"
        name="fundName"
        id="fundName"
        className={`shadow-input rounded-lg w-[650px] h-[40px] px-5 outline-none border-2 ${
          isValid ? "border-black" : "border-red-500"
        }`}
        placeholder="QUBJYH3..."
      />
      {!isValid && (
        <p className="text-red-500 text-sm mt-1">
          Address not valid. Please enter a valid Algorand address.
        </p>
      )}
      <button
        className={`bg-green-500 px-8 py-3 rounded-xl mx-10 text-white ${
          !isValid || !address ? "opacity-50" : ""
        }`}
        disabled={!isValid || !address}
        onClick={() => console.log("Button clicked")}
      >
        Add address
      </button>
    </div>
  );
}
