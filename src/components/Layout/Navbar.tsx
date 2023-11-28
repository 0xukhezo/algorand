// React
import React from "react";
// Next
import Image from "next/image";
// Image
import Logo from "../../../public/Logo.svg";

export default function Navbar() {
  return (
    <div className="border-b-1 h-[100px] flex px-20">
      {" "}
      <Image src={Logo.src} height={41.4} width={138} alt="Algorand Logo" />
    </div>
  );
}
