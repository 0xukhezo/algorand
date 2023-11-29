// React
import React, { ReactElement } from "react";
// Next
import { useRouter } from "next/router";

type InfoDisplayerProps = {
  title: string;
  value: string | number | ReactElement;
};

export default function InfoDisplayer({ title, value }: InfoDisplayerProps) {
  const router = useRouter();

  return (
    <div className="my-4">
      <li className="font-semibold">{title}</li>
      <li className={value === router.query.address ? "hidden xl:block" : ""}>
        {value}
      </li>
      {value === router.query.address && (
        <li className={value === router.query.address ? "block xl:hidden" : ""}>
          {value.slice(0, 6)}...{value.slice(-4)}{" "}
        </li>
      )}
    </div>
  );
}
