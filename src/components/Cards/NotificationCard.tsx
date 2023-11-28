import React, { ReactElement } from "react";

type NotificationCardProps = {
  message: string | undefined | ReactElement;
  color: string;
  index?: number;
};

export default function NotificationCard({
  message,
  color,
  index,
}: NotificationCardProps) {
  return (
    <div
      className="max-w-[350px] h-fit right-5 rounded-xl z-50 my-2"
      style={{
        backgroundColor: color,
        top: `${index !== undefined ? index * 90 + 140 : 70}px`,
      }}
    >
      <div className="px-4 pt-4 mb-2">{message}</div>
      <div className="progress"></div>
    </div>
  );
}
