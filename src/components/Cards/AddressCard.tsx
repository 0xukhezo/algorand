import { accountType } from "@/types/types";
import Link from "next/link";
import React from "react";

type AddressCardProps = {
  addressInfo: accountType;
  index: number;
};

export default function AddressCard({ addressInfo, index }: AddressCardProps) {
  return (
    <Link href={`/address/${addressInfo.address}`}>
      <main
        className={`grid grid-cols-4 text-center py-4 border-b-1 hover:bg-gray-200 hover:font-medium ${
          index % 2 ? "bg-gray-50" : "bg-white"
        }`}
      >
        <div>{addressInfo.id}</div>
        <div className="col-span-2">{addressInfo.address}</div>
        <div>{addressInfo.amount / 1000000}</div>
      </main>{" "}
    </Link>
  );
}
