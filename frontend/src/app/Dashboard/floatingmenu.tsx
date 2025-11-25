"use client";

import { useState } from "react";

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed top-22/24 right-11/24 z-50 flex items-center justify-center cursor-pointer "
      onClick={() => setOpen(!open)}
    >
      <div
        className={`flex items-center gap-3 px-4 w-14 h-10 rounded-full bg-[#0067FE] transition-all duration-300 ease-in-out ${
          open ? "w-70" : "w-30"
        }`}
      >
          <>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            </div>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            </div>
          </>
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>
    </div>
  );
}
