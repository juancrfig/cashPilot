"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { GetJson } from "./apiClient";
import { useState } from "react";
import {IUser} from "./Interfaces/IUser";


export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();

  const handlelogin = async () => {
    if (!email || !password) {
          Swal.fire({
            title: "Oops 😢",
            text: "Please fill in all fields.",
            icon: "warning",
            background: "#1e1e1e",
            color: "#fff",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Got it!",
          });
    }
    else
    {
      try {
        const usuarios = await GetJson("users") as IUser[];
        const usuario = usuarios.find(
          (u: IUser) => u.email.toLowerCase() === email.toLowerCase()
        );
        console.log(usuario);
        if (usuario == undefined) {
          Swal.fire({
            title: "User not found",
            text: "Please check your credentials and try again.",
            icon: "error",
            background: "#1e1e1e",
            color: "#fff",
            confirmButtonColor: "#d33",
            confirmButtonText: "Try again",
          });
        }
        else
        {
          Swal.fire({
            title: `Welcome back ${usuario.username}!`,
            text: "Logging in, please wait...",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            theme: "dark",
            didOpen: () => {
              Swal.showLoading();
              setTimeout(() => {
                Swal.close();
                router.push("/Dashboard");
              }, 2500);
            },
          });
        }
      }
      catch (error)
      {
        console.error(error)
      }
    }
  }
  return (
    <div>
      <header>
        <div className="flex m-7 ml-[4.5vw] mb-2">
          <img src="./logo.png" alt="" /> 
          <h1 className="text-6xl pt-4 pl-7">Login</h1>
        </div>
        <hr className="w-[90vw] ml-22 text-[#0067FE] border-t-4 border-[#0067FE] rounded-full"/>
      </header>
      <section className="flex mt-[7vw] justify-center">
          <div className="text-center p-10 pl-20 pr-20 w-[50vw] rounded-[5rem] border-5 border-[#0067FE] shadow-[0_0_100px_#0067FE] justify-items-start">
            <h1 className="text-5xl mb-4 ml-5 ">Email</h1>
            <input placeholder="name@email.com" type="text" name="" id="EmailInput" onChange={(e) => setEmail(e.target.value)} className="mb-4 placeholder:opacity-40 text-5xl w-full py-3 px-6 bg-[#12193A] rounded-4xl"/>
            <h1 className="text-5xl ml-5 text-left mb-4">Password</h1>
            <input placeholder="**********" type="password" name="" id="PasswordInput"  onChange={(e) => setPassword(e.target.value)} className="mb-4 placeholder:opacity-40 text-5xl w-full py-3 px-6 bg-[#12193A] rounded-4xl"/>
            <h1 className="mt-5 mb-4 text-2xl ml-5">¿No tienes cuenta?, Registrate <Link href="/Signup" className="text-[#0067FE] underline hover:text-[#3399FF]">Aquí</Link>.</h1>
            <button onClick={handlelogin} className="px-15 text-5xl border-[#0067FE] border-2 p-2 rounded-full bg-[#0067FE]">Login</button>
          </div>
      </section>
    </div>
  );
}
