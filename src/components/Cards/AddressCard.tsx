// React
import React from "react";
// Next
import Link from "next/link";
// Types
import { accountType } from "@/types/types";
// Utils
import { formaNumber } from "@/utils/formatNumber";

type AddressCardProps = {
  addressInfo: accountType;
};

export default function AddressCard({ addressInfo }: AddressCardProps) {
  return (
    <Link href={`/address/${addressInfo.address}`}>
      <main className="grid grid-cols-8 text-start py-7">
        <div className="font-bold">{addressInfo.id}</div>
        <div className="col-span-6">{addressInfo.address}</div>
        <div className="font-bold">
          {formaNumber(addressInfo.amount / 1000000)}
        </div>
      </main>{" "}
    </Link>
  );
}
