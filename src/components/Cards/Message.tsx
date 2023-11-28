// React
import React from "react";
// Utils
import { displayKeys } from "@/utils/displayKeys";
import { formaNumber } from "@/utils/formatNumber";

type MessageProps = {
  data: any;
};

type MessageRowProps = {
  title: string;
  value: number;
};

const MessageRow = ({ title, value }: MessageRowProps) => {
  if (value === 0 || title === "address") {
    return null;
  }

  if (title === "accountStatus" && typeof value !== "number") {
    return (
      <>
        {value[0] ? null : (
          <li className="text-sm items-center">
            {title}:{value}
          </li>
        )}
      </>
    );
  }

  return (
    <li className="text-sm items-center">
      {displayKeys(title)}: {value > 0 ? "+" : ""}
      {value < 0.0001 ? value : formaNumber(value)}
    </li>
  );
};

export default function Message({ data }: MessageProps) {
  return (
    <ul className="text-start">
      <li>
        {data.address.slice(0, 6)}...{data.address.slice(-4)}
      </li>
      {Object.keys(data).map((key: string) => {
        return <MessageRow title={key} value={data[key]} key={key} />;
      })}
    </ul>
  );
}
