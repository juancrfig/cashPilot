"use client";

import { useState } from "react";
import Image from "next/image";
// import { ArrowBigUp, ArrowBigDown, ClockArrowDown, ClockArrowUp, Plus, ArrowRightLeft} from "lucide-react";

export default function ExpandableButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed top-96/100 left-1/2 -translate-x-1/2 -translate-y-97/100
      flex items-center bg-blue-600 rounded-full transition-all duration-300 
      overflow-hidden cursor-pointer
      ${hovered ? "w-[450px] px-4 py-2" : "w-[170px] h-[41px] px-2"}`}
    >
      <div
        className={`transition-opacity duration-200 ${
          hovered ? "opacity-0 absolute" : "opacity-100"
        }`}
      ></div>

      <div
        className={`flex justify-between w-full transition-all duration-300 
        ${hovered ? "opacity-100" : "opacity-0"}`}
      >
        <Image src="/Dashboard/Transaction.svg" alt="Logo" width={50} height={10} priority/>
        <Image src="/Dashboard/Recurrent.svg" alt="Logo" width={50} height={10} priority/>
        <Image src="/Dashboard/Unique.svg" alt="Logo" width={50} height={10} priority/>
        <Image src="/Dashboard/UniqueE.svg" alt="Logo" width={50} height={10} priority/>
        <Image src="/Dashboard/RecurrentE.svg" alt="Logo" width={50} height={10} priority/>
        <Image src="/Dashboard/New.svg" alt="Logo" width={50} height={10} priority/>
        {/* <ArrowRightLeft size={45} className="text-[#12193A] bg-white rounded-full p-1" strokeWidth={3} fill="none" />
        <ClockArrowDown size={45} className="text-[#15E5E7] bg-white rounded-full p-1" strokeWidth={3} fill="none"/>
        <ArrowBigUp size={45} className="text-[#15E5E7] bg-white rounded-full" strokeWidth={0} fill="currentColor"/>
        <ArrowBigDown size={45} className="text-[#C01A40] bg-white rounded-full" strokeWidth={0} fill="currentColor" />
        <ClockArrowUp size={45} className="text-[#C01A40] bg-white rounded-full p-1" strokeWidth={3} fill="none"/>
        <Plus size={45} className="text-[#12193A] bg-white rounded-full" strokeWidth={3} fill="none" /> */}
      </div>
    </div>
  );
}
