"use client";

import ExpandableButton from "./expandablebutton";
import Swal from "sweetalert2";
import Image from "next/image";
import {useState } from "react";
import { openProfile } from "./profile";

export default function Signup() {
  const [titulo, setTitulo] = useState("Dashboard");
  const opencomponent = async (component: number) => {
    switch (component) {
      case 1:
        Swal.fire({
          title: "Panel 1.1",
          text: "Estás en el panel 1.1 ✨",
          icon: "success",
          background: "#1e1e1e",
          color: "#fff",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Got it!",
        });
        break;

      case 2:
        Swal.fire({
          title: "Panel 1.2",
          text: "Estás en el panel 1.2 ✨",
          icon: "success",
          background: "#1e1e1e",
          color: "#fff",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Perfecto",
        });
        break;

      case 3:
        Swal.fire({
          title: "Panel 2.1",
          text: "Estás en el panel 2.1 ✨",
          icon: "success",
          background: "#1e1e1e",
          color: "#fff",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        break;

      case 4:
        Swal.fire({
          title: "Panel 2.2",
          text: "Estás en el panel 2.2 ✨",
          icon: "success",
          background: "#1e1e1e",
          color: "#fff",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Esperaré",
        });
        break;

      case 5:
        Swal.fire({
          title: "Panel 2.3",
          text: "Estás en el panel 2.3 ✨",
          icon: "success",
          background: "#1e1e1e",
          color: "#fff",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Okis",
        });
        break;
    }
  };
  const openprofile = async () =>  {
    setTitulo("Profile");
    const newTitle = await openProfile();
    setTitulo(newTitle);
  };
  return (
    <div>
      <header>
        <div className="flex items-center justify-between m-7 ml-[4.5vw] mb-2">
          <div className="flex items-center">
            <Image src="./logo.svg" alt="Logo" width={170} height={76} priority/>
            <h1 className="text-6xl pt-4 pl-7 ">{titulo}</h1>
          </div>
         <Image src="./Settings.svg" alt="Logo" width={45} height={40} priority className="relative top-0 right-19" onClick={openprofile}/>
        </div>
        <hr className="w-[90vw] ml-22 text-[#0067FE] border-t-4 border-[#0067FE] rounded-full"/>
      </header>
      <section className="flex mt-[0.5vw] m-20">
          <div className="">
            <div onClick={() => opencomponent(1)} className="m-2 rounded-[3vw] w-[55vw] h-[31.4vw] bg-[#12193A]">
            </div>
            <div onClick={() => opencomponent(2)} className="m-2 rounded-[3vw] w-[55vw] h-[15.8vw] bg-[#12193A]">
            </div>
          </div>
          <div>
            <div onClick={() => opencomponent(3)} className="m-2 rounded-[3vw] w-[34vw] h-[15.6vw] bg-[#12193A]">
            </div>
            <div onClick={() => opencomponent(4)} className="m-2 rounded-[3vw] w-[34vw] h-[15.6vw] bg-[#12193A]">
            </div>
            <div onClick={() => opencomponent(5)} className="m-2 rounded-[3vw] w-[34vw] h-[15.6vw] bg-[#12193A]">
            </div>
          </div>
      </section>
      <footer>
        <ExpandableButton />
      </footer>
    </div>
  );
}
