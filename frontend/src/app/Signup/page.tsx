"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { GetJson } from "../apiClient";
import { useState } from "react";
import {IUser} from "../Interfaces/IUser";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirm) {
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
    else if (password != confirm)
    {
      Swal.fire({
        title: "Passwords don’t match 😢",
        text: "Please make sure both password fields are identical.",
        icon: "error",
        background: "#1e1e1e",
        color: "#fff",
        confirmButtonColor: "#d33",
        confirmButtonText: "Try again",
      });
    }
    else {
      try {
        const usuarios = await GetJson("users") as IUser[];
        const usuario = usuarios.find(
          (u: IUser) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (usuario == undefined) {
          // recordad que aqui debo agregar el post cuando este la base de datos
          Swal.fire({
            title: `Welcome back!`,
            text: "Signup in, please wait...",
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
        else{
          Swal.fire({
            title: "User already exists",
            text: "An account with this email already exists. Please log in instead.",
            icon: "warning",
            background: "#1e1e1e",
            color: "#fff",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Go to login",
          });
        }
        
      } catch (error) {
        console.error(error)
      }
    }
  }
  return (
    <div>
      <header>
        <div className="flex m-7 ml-[4.5vw] mb-2">
          <img src="./logo.svg" alt="" /> 
          <h1 className="text-6xl pt-4 pl-7">Signup</h1>
        </div>
        <hr className="w-[90vw] ml-22 text-[#0067FE] border-t-4 border-[#0067FE] rounded-full"/>
      </header>
      <section className="flex mt-[7vw] justify-center">
          <div className="text-center p-10 pl-20 pr-20 w-[50vw] rounded-[5rem] border-5 border-[#0067FE] shadow-[0_0_100px_#0067FE] justify-items-start">
                  <h1 className="text-5xl ml-5 mb-4">Name</h1>
                  <input placeholder="Your Name" type="text" name="" id="NameInput" onChange={(e) => setName(e.target.value)} className=" mb-4 placeholder:opacity-40 text-5xl w-full py-3 px-6 bg-[#12193A] rounded-4xl "/>
                  <h1 className="text-5xl mb-4 ml-5 ">Email</h1>
                  <input placeholder="name@email.com" type="text" name="" id="EmailInput" onChange={(e) => setEmail(e.target.value)} className="mb-4 placeholder:opacity-40 text-5xl w-full py-3 px-6 bg-[#12193A] rounded-4xl"/>
              <div className="flex">
                <div className="pr-10 pt-1 w-[20vw]">
                  <h1 className="text-5xl ml-5 text-left mb-4">Password</h1>
                  <input placeholder="**********" type="password" name="" id="PasswordInput"  onChange={(e) => setPassword(e.target.value)} className="mb-4 placeholder:opacity-40 text-5xl w-full py-3 px-6 bg-[#12193A] rounded-4xl"/>
                </div>
                <div className="pl-1 pt-1 w-[21vw]">
                  <h1 className="text-5xl text-left mb-4 ml-5">Confirm</h1>
                  <input placeholder="**********" type="password" name="" id="ConfirmInput"  onChange={(e) => setConfirm(e.target.value)} className="mb-3 placeholder:opacity-40 text-5xl w-full py-3 px-6 bg-[#12193A] rounded-4xl"/>
                </div>
              </div>
              <h1 className="mt-5 mb-4 text-2xl ml-5">¿Ya tienes cuenta?, Inicia Sesión <Link href="/" className="text-[#0067FE] underline hover:text-[#3399FF]">Aquí</Link>.</h1>
              <button onClick={handleSignup} className="px-15 text-5xl border-[#0067FE] border-2 p-2 rounded-full bg-[#0067FE]">Signup</button>
          </div>
      </section>
    </div>
  );
}
