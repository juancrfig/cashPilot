"use client";

import { useState } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";

export default function ExpandableButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed top-94/100 left-1/2 -translate-x-1/2
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
        <ArrowBigUp size={45} className="text-teal-300 bg-white rounded-full" strokeWidth={0} fill="currentColor"/>
        <ArrowBigUp size={45} className="text-teal-300 bg-white rounded-full" strokeWidth={0} fill="currentColor"/>
        <ArrowBigUp size={45} className="text-teal-300 bg-white rounded-full" strokeWidth={0} fill="currentColor"/>
        <ArrowBigDown size={45} className="text-red-400 bg-white rounded-full" strokeWidth={0} fill="currentColor" />
        <ArrowBigDown size={45} className="text-red-400 bg-white rounded-full" strokeWidth={0} fill="currentColor" />
        <ArrowBigDown size={45} className="text-red-400 bg-white rounded-full" strokeWidth={0} fill="currentColor" />
      </div>
    </div>
  );
}
