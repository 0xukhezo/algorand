// React
import React from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// Types
import { accountType } from "@/types/types";
// Utils
import { formaNumber } from "@/utils/formatNumber";
// Images
import Token from "../../../public/AlgorandToken.png";

type AddressCardProps = {
  addressInfo: accountType;
};

export default function AddressCard({ addressInfo }: AddressCardProps) {
  return (
    <Link href={`/address/${addressInfo.address}`}>
      <main className="grid grid-cols-4 lg:grid-cols-10 text-start py-7">
        <div className="font-bold">{addressInfo.id}</div>
        <div className="hidden xl:block col-span-8">{addressInfo.address}</div>
        <div className="block xl:hidden col-span-2 lg:col-span-8">
          {addressInfo.address.slice(0, 6)}...{addressInfo.address.slice(-4)}{" "}
        </div>
        <div className="font-bold flex">
          {formaNumber(addressInfo.amount / 1000000)}
          <Image height={24} width={24} alt="Algorand Logo" src={Token.src} />
        </div>
      </main>{" "}
    </Link>
  );
}
