import Loader from "@/components/Loader/Loader";
import useAddress from "@/hooks/useAddress";
import { displayKeys } from "@/utils/displayKeys";
import { formaNumber } from "@/utils/formatNumber";
import { useRouter } from "next/router";
// React
import React, { ReactElement } from "react";
// Heroicons
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type InfoDisplayerProps = {
  title: string;
  value: string | number | ReactElement;
};

const InfoDisplayer = ({ title, value }: InfoDisplayerProps) => {
  return (
    <div className="my-4">
      <li className="font-semibold">{title}</li>
      <li>{value}</li>
    </div>
  );
};

export default function AddressDetails() {
  const router = useRouter();
  const { address, error, isLoading } = useAddress({
    addressToFetch: router.query.address as string,
  });

  return (
    <main className="mt-[40px] px-20">
      <div className="flex items-center mb-6">
        <Link href="/">
          <ArrowLeftIcon height={24} width={24} aria-hidden="true" />{" "}
        </Link>

        <h1 className="ml-6 text-lg font-bold uppercase">Address details</h1>
      </div>

      {isLoading ? (
        <section className="flex justify-center">
          <Loader />
        </section>
      ) : error ? (
        <>Error fetching Account details</>
      ) : (
        address && (
          <ul className="grid grid-cols-2 overflow-auto h-[760px] px-8 ml-6">
            <div>
              <InfoDisplayer title={"Account"} value={address.address} />{" "}
              <InfoDisplayer title={"Watcher ID"} value={address.id} />{" "}
              <InfoDisplayer title={"Status"} value={address.status} />{" "}
              <li>
                {Object.keys(address.appsTotalSchema).map(
                  (key: string, index: number) => {
                    return (
                      <InfoDisplayer
                        title={index === 0 ? "Num Byte Slice" : "Num Uint"}
                        value={address.appsTotalSchema[key]}
                      />
                    );
                  }
                )}
              </li>{" "}
              <InfoDisplayer
                title={"Total Apps Opened"}
                value={address.totalAppsOptedIn}
              />
              <InfoDisplayer
                title={"Total Apps Created "}
                value={address.totalCreatedApps}
              />
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
                          {address.assets[index]["is-frozen"]
                            ? "Live"
                            : "Frozen"}
                        </li>
                      </ul>
                    }
                    key={key}
                  />
                );
              })}
            </div>
            <div className="mx-auto">
              <InfoDisplayer
                title={"Balance"}
                value={formaNumber(address.amount / 1000000)}
              />{" "}
              <InfoDisplayer
                title={"Pending Rewards"}
                value={formaNumber(address.pendingRewards / 1000000)}
              />
              <InfoDisplayer
                title={"Balance Without Pending Rewards"}
                value={formaNumber(
                  address.amountWithoutPendingRewards / 1000000
                )}
              />
              <InfoDisplayer
                title={"Min Balance"}
                value={formaNumber(address.minBalance / 1000000)}
              />{" "}
              <InfoDisplayer
                title={"Total Assets Opened"}
                value={address.totalAssetsOptedIn}
              />
              <InfoDisplayer
                title={"Total Assets Created "}
                value={address.totalCreatedAssets}
              />
            </div>
          </ul>
        )
      )}
    </main>
  );
}
