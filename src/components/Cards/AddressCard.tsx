import { addressType } from "@/types/types";
import Link from "next/link";
import React from "react";

type AddressCardProps = {
  addressInfo: addressType;
};

export default function AddressCard({ addressInfo }: AddressCardProps) {
  return (
    <Link href={`/address/${addressInfo.address}`}>
      <main className="grid grid-cols-4 text-center py-4 border-b-1 hover:bg-gray-300 hover:text-white">
        <div>{addressInfo.id}</div>
        <div className="col-span-2">{addressInfo.address}</div>
        <div>{addressInfo.balance}</div>
      </main>{" "}
    </Link>
  );
}
