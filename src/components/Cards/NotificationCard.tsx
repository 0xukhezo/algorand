import React from "react";

type NotificationCardProps = {
  message: string | undefined;
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
      className="max-w-[275px] max-h-[90px] absolute right-10 rounded-xl z-50"
      style={{
        backgroundColor: color,
        top: `${index !== undefined ? index * 90 + 140 : 70}px`,
      }}
    >
      <div className="px-4 pt-4 mb-4">{message}</div>
      <div className="progress"></div>
    </div>
  );
}
