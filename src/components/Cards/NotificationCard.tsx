import React from "react";

type NotificationCardProps = {
  message: string | undefined;
  color: string;
};

export default function NotificationCard({
  message,
  color,
}: NotificationCardProps) {
  return (
    <div
      className="w-fit p-4 absolute right-10 rounded-xl"
      style={{ backgroundColor: color }}
    >
      {message}
    </div>
  );
}
