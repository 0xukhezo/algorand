// React
import React, { ReactElement } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// Components
import InfoDisplayer from "../Cards/InfoDisplayer";
// Utils
import { formaNumber } from "@/utils/formatNumber";
// Heroicons
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
// Types
import { accountType } from "@/types/types";
// Images
import Token from "../../../public/AlgorandToken.png";

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
    {
      title: "Balance",
      value: (
        <div className="flex items-center">
          {formaNumber(address.amount / 1000000)}
          <Image
            height={24}
            width={24}
            alt="Algorand Logo"
            src={Token.src}
            className="max-w-[24px] max-h-[24px]"
          />
        </div>
      ),
    },
    {
      title: "Pending Rewards",
      value: (
        <div className="flex items-center">
          {formaNumber(address.pendingRewards / 1000000)}
          <Image
            height={24}
            width={24}
            alt="Algorand Logo"
            src={Token.src}
            className="max-w-[24px] max-h-[24px]"
          />
        </div>
      ),
    },
    {
      title: "Balance Without Pending Rewards",
      value: (
        <div className="flex items-center">
          {formaNumber(address.amountWithoutPendingRewards / 1000000)}{" "}
          <Image
            height={24}
            width={24}
            alt="Algorand Logo"
            src={Token.src}
            className="max-w-[24px] max-h-[24px]"
          />
        </div>
      ),
    },
    {
      title: "Min Balance",
      value: (
        <div className="flex">
          {formaNumber(address.minBalance / 1000000)}{" "}
          <Image
            height={24}
            width={24}
            alt="Algorand Logo"
            src={Token.src}
            className="max-w-[24px] max-h-[24px]"
          />
        </div>
      ),
    },
    { title: "Total Assets Opened", value: address.totalAssetsOptedIn },
    { title: "Total Assets Created", value: address.totalCreatedAssets },
  ];

  return (
    <main className="mt-[40px] xl:px-20 lg:px-16 md:px-10 sm:px-6 px-4">
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
