import { addressType } from "@/types/types";
import React from "react";

type AddressCardProps = {
  addressInfo: addressType;
};

export default function AddressCard({ addressInfo }: AddressCardProps) {
  return <div>{addressInfo.id}</div>;
}
