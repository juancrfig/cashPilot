"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { GetJson } from "./apiClient";
import { useState } from "react";
import { IUser } from "./Interfaces/IUser";

const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || email.trim() === "") {
    return { isValid: false, error: "Email is required" };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email" };
  }
  
  if (email.length > 254) {
    return { isValid: false, error: "Email is too long" };
  }
  
  return { isValid: true };
};

const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password || password.trim() === "") {
    return { isValid: false, error: "Password is required" };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: "Password must be at least 6 characters" };
  }
  
  if (password.length > 128) {
    return { isValid: false, error: "Password is too long" };
  }
  
  return { isValid: true };
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError && value) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError && value) {
      setPasswordError("");
    }
  };

  const handleEmailBlur = () => {
    if (email) {
      const validation = validateEmail(email);
      if (!validation.isValid) {
        setEmailError(validation.error || "");
      }
    }
  };

  const handlePasswordBlur = () => {
    if (password) {
      const validation = validatePassword(password);
      if (!validation.isValid) {
        setPasswordError(validation.error || "");
      }
    }
  };

  const handlelogin = async () => {
    if (isLoading) return;

    setEmailError("");
    setPasswordError("");

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || "");
      Swal.fire({
        title: "Validation Error",
        text: emailValidation.error,
        icon: "warning",
        background: "#1e1e1e",
        color: "#fff",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Got it",
      });
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error || "");
      Swal.fire({
        title: "Validation Error",
        text: passwordValidation.error,
        icon: "warning",
        background: "#1e1e1e",
        color: "#fff",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Got it",
      });
      return;
    }

    setIsLoading(true);

    try {
      const usuarios = await GetJson("users") as IUser[];
      
      if (!usuarios || !Array.isArray(usuarios)) {
        throw new Error("Error fetching user list");
      }

      const usuario = usuarios.find(
        (u: IUser) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!usuario) {
        Swal.fire({
          title: "User not found",
          text: "Please check your credentials and try again.",
          icon: "error",
          background: "#1e1e1e",
          color: "#fff",
          confirmButtonColor: "#d33",
          confirmButtonText: "Try again",
        });
        return;
      }

      Swal.fire({
        title: `Welcome back ${usuario.username}!`,
        text: "Logging in, please wait...",
        icon: "success",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        background: "#1e1e1e",
        color: "#fff",
        didOpen: () => {
          Swal.showLoading();
          setTimeout(() => {
            Swal.close();
            router.push("/Dashboard");
          }, 2500);
        },
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Connection Error",
        text: "There was a problem connecting to the server. Please try later.",
        icon: "error",
        background: "#1e1e1e",
        color: "#fff",
        confirmButtonColor: "#d33",
        confirmButtonText: "Got it",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handlelogin();
    }
  };

  return (
    <div>
      <header>
        <div className="flex m-7 ml-[4.5vw] mb-2">
          <img src="./logo.svg" alt="Logo" /> 
          <h1 className="text-6xl pt-4 pl-7">Login</h1>
        </div>
        <hr className="w-[90vw] ml-22 text-[#0067FE] border-t-4 border-[#0067FE] rounded-full"/>
      </header>
      <section className="flex mt-[7vw] justify-center">
        <div className="text-center p-10 pl-20 pr-20 w-[50vw] rounded-[5rem] border-5 border-[#0067FE] shadow-[0_0_100px_#0067FE] justify-items-start">
          <div className="text-left mb-6 ">
            <h1 className="text-5xl mb-4 ml-5">Email</h1>
            <input 
              placeholder="name@email.com" 
              type="email" 
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className={`mb-2 placeholder:opacity-40 text-5xl  w-[42vw] py-3 px-6 bg-[#12193A] rounded-4xl transition-all ${
                emailError ? "border-2 border-red-500" : ""
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {emailError && (
              <p className="text-red-500 text-xl ml-5 mt-2">{emailError}</p>
            )}
          </div>

          <div className="text-left mb-6">
            <h1 className="text-5xl ml-5 mb-4">Password</h1>
            <input 
              placeholder="**********" 
              type="password" 
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className={`mb-2 placeholder:opacity-40 text-5xl w-[42vw] py-3 px-6 bg-[#12193A] rounded-4xl transition-all ${
                passwordError ? "border-2 border-red-500" : ""
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {passwordError && (
              <p className="text-red-500 text-xl ml-5 mt-2">{passwordError}</p>
            )}
          </div>

          <h1 className="mt-5 mb-4 text-2xl ml-5">
            Don't have an account? Sign up{" "}
            <Link href="/Signup" className="text-[#0067FE] underline hover:text-[#3399FF]">
              Here
            </Link>.
          </h1>
          
          <button 
            onClick={handlelogin}
            disabled={isLoading}
            className={`px-15 text-5xl border-[#0067FE] border-2 p-2 rounded-full bg-[#0067FE] transition-all ${
              isLoading 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:bg-[#0052CC] hover:shadow-lg"
            }`}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </section>
    </div>
  );
}