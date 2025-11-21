"use client";
import FloatingMenu from "./floatingmenu";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Signup() {
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
  return (
    <div>
      <header>
        <div className="flex items-center justify-between m-7 ml-[4.5vw] mb-2">
          <div className="flex items-center">
            <img src="./logo.svg" alt="" />
            <h1 className="text-6xl pt-4 pl-7">Dashboard</h1>
          </div>

          <img src="./Settings.svg" alt="" className="mr-14" />
        </div>
        <hr className="w-[90vw] ml-22 text-[#0067FE] border-t-4 border-[#0067FE] rounded-full"/>
      </header>
      <section className="flex mt-[1vw] m-20">
          <div className="">
            <div onClick={() => opencomponent(1)} className="m-2 rounded-[3vw] w-[55vw] h-[32vw] bg-[#12193A]">
            </div>
            <div onClick={() => opencomponent(2)} className="m-2 rounded-[3vw] w-[55vw] h-[16vw] bg-[#12193A]">
            </div>
          </div>
          <div>
            <div onClick={() => opencomponent(3)} className="m-2 rounded-[3vw] w-[34vw] h-[15.9vw] bg-[#12193A]">
            </div>
            <div onClick={() => opencomponent(4)} className="m-2 rounded-[3vw] w-[34vw] h-[15.9vw] bg-[#12193A]">
            </div>
            <div onClick={() => opencomponent(5)} className="m-2 rounded-[3vw] w-[34vw] h-[15.9vw] bg-[#12193A]">
            </div>
          </div>
      </section>
      <footer>
      </footer>
    </div>
  );
}
