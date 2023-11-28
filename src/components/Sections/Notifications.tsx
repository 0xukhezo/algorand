// React
import React from "react";
// Components
import Message from "../Cards/Message";
import NotificationCard from "../Cards/NotificationCard";
import Loader from "../Loader/Loader";

type NotificationsProps = {
  color: string;
  message: string | undefined;
  newChanges: any;
};

export default function Notifications({
  color,
  message,
  newChanges,
}: NotificationsProps) {
  return (
    <section className="flex flex-col px-4 lg:w-[480px] w-full overflow-y-auto lg:h-screen my-[5px] pb-[30px]">
      <h1 className="my-[35px] text-lg font-bold uppercase">Notifications</h1>
      {message && <NotificationCard message={message} color={color} />}
      {newChanges &&
        newChanges.map((change: any, index: number) => {
          return (
            <NotificationCard
              message={<Message data={change} />}
              color={color}
              index={index}
              data={change}
              key={index}
            />
          );
        })}
      {message === undefined && newChanges === undefined && (
        <NotificationCard message={"Updating data..."} color={color} />
      )}
    </section>
  );
}
