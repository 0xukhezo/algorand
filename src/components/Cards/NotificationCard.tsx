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
      className="max-w-[275px] max-h-[80px] p-4 absolute right-10 rounded-xl z-50"
      style={{
        backgroundColor: color,
        top: `${index !== undefined ? index * 90 + 70 : 0}px`,
      }}
    >
      {message}
    </div>
  );
}
