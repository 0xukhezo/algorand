// React
import React, { ReactElement, useEffect } from "react";
// Next
import Link from "next/link";
// Components
import Loader from "@/components/Loader/Loader";
import InfoDisplayer from "../Cards/InfoDisplayer";
// Utils
import { formaNumber } from "@/utils/formatNumber";
// Heroicons
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
// Types
import { accountType } from "@/types/types";

type AccountDetailsProps = {
  address: accountType;
};

export default function AccountDetails({ address }: AccountDetailsProps) {
  const column1 = [
    { title: "Account", value: address.address },
    { title: "Watcher ID", value: address.id },
    { title: "Status", value: address.status },
    { title: "Total Apps Opened", value: address.id },
    { title: "Total Apps Created", value: address.status },
  ];

  const column2 = [
    { title: "Balance", value: formaNumber(address.amount / 1000000) },
    {
      title: "Pending Rewards",
      value: formaNumber(address.pendingRewards / 1000000),
    },
    {
      title: "Balance Without Pending Rewards",
      value: formaNumber(address.amountWithoutPendingRewards / 1000000),
    },
    { title: "Min Balance", value: formaNumber(address.minBalance / 1000000) },
    { title: "Total Assets Opened", value: address.totalAssetsOptedIn },
    { title: "Total Assets Created", value: address.totalCreatedAssets },
  ];

  return (
    <main className="mt-[40px] px-20">
      <div className="flex items-center mb-6">
        <Link href="/">
          <ArrowLeftIcon height={24} width={24} aria-hidden="true" />{" "}
        </Link>

        <h1 className="ml-6 text-lg font-bold uppercase">Address details</h1>
      </div>

      <ul className="grid grid-cols-2 overflow-auto h-[760px] px-8 ml-6">
        <div>
          {column1.map(
            (dataPoint: {
              title: string;
              value: string | number | ReactElement;
            }) => {
              return (
                <InfoDisplayer
                  title={dataPoint.title}
                  value={dataPoint.value}
                  key={dataPoint.title}
                />
              );
            }
          )}
          <li>
            {Object.keys(address.appsTotalSchema).map(
              (key: string, index: number) => {
                return (
                  <InfoDisplayer
                    title={index === 0 ? "Num Byte Slice" : "Num Uint"}
                    value={address.appsTotalSchema[key]}
                    key={key}
                  />
                );
              }
            )}
          </li>{" "}
          {Object.keys(address.assets).map((key: string, index: number) => {
            return (
              <InfoDisplayer
                title={`Asset ${address.assets[index]["asset-id"]}`}
                value={
                  <ul>
                    <li>ID: {address.assets[index]["asset-id"]}</li>
                    <li>Amount: {address.assets[index]["amount"]}</li>
                    <li>
                      Frozen:{" "}
                      {address.assets[index]["is-frozen"] ? "Live" : "Frozen"}
                    </li>
                  </ul>
                }
                key={key}
              />
            );
          })}
        </div>
        <div className="mx-auto">
          {column2.map(
            (dataPoint: {
              title: string;
              value: string | number | ReactElement;
            }) => {
              return (
                <InfoDisplayer
                  title={dataPoint.title}
                  value={dataPoint.value}
                  key={dataPoint.title}
                />
              );
            }
          )}
        </div>
      </ul>
    </main>
  );
}
