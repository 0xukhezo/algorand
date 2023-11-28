// React
import React, { ReactElement } from "react";

type InfoDisplayerProps = {
  title: string;
  value: string | number | ReactElement;
};

export default function InfoDisplayer({ title, value }: InfoDisplayerProps) {
  return (
    <div className="my-4">
      <li className="font-semibold">{title}</li>
      <li>{value}</li>
    </div>
  );
}
