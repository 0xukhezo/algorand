// React
import React, { ReactElement } from "react";
// Components
import Loader from "../Loader/Loader";

type NotificationCardProps = {
  message: string | undefined | ReactElement;
  color: string;
  data?: any;
  index?: number;
};

export default function NotificationCard({
  message,
  color,
  data,
  index,
}: NotificationCardProps) {
  if (data) {
    const propertiesExcluding = ["address", "accountStatus"];

    const numberPropertiesZero = Object.entries(data)
      .filter(([key]) => !propertiesExcluding.includes(key))
      .every(([_, value]) => value === 0);

    const accountStatusNotChange =
      data.accountStatus && data.accountStatus[0] === true;

    if (numberPropertiesZero && accountStatusNotChange) {
      return null;
    }
  }

  return (
    <div
      className={`max-w-[600px] lg:max-w-[350px] h-fit right-5 rounded-xl z-50 my-2 ${
        message !== "Updating data..." ? "" : "text-center flex flex-col"
      }`}
      style={{
        backgroundColor: color,
        top: `${index !== undefined ? index * 90 + 140 : 70}px`,
      }}
    >
      <div className="px-4 pt-4 mb-2">{message}</div>
      {message !== "Updating data..." ? (
        <div className="progress"></div>
      ) : (
        <div className="flex justify-center -mt-4">
          <Loader />
        </div>
      )}
    </div>
  );
}
