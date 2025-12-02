"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { GetJson } from "../apiClient";
import { useState } from "react";
import { IUser } from "../Interfaces/IUser";
import Image from "next/image";

const validateName = (name: string): { isValid: boolean; error?: string } => {
  if (!name || name.trim() === "") {
    return { isValid: false, error: "Name is required" };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters" };
  }
  
  if (name.length > 50) {
    return { isValid: false, error: "Name is too long" };
  }
  
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
  if (!nameRegex.test(name)) {
    return { isValid: false, error: "Name contains invalid characters" };
  }
  
  return { isValid: true };
};

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

const validateConfirmPassword = (
  password: string,
  confirm: string
): { isValid: boolean; error?: string } => {
  if (!confirm || confirm.trim() === "") {
    return { isValid: false, error: "Please confirm your password" };
  }
  
  if (password !== confirm) {
    return { isValid: false, error: "Passwords don't match" };
  }
  
  return { isValid: true };
};

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (nameError && value) {
      setNameError("");
    }
  };

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
    if (confirm && confirmError) {
      setConfirmError("");
    }
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirm(value);
    if (confirmError && value) {
      setConfirmError("");
    }
  };

  const handleNameBlur = () => {
    if (name) {
      const validation = validateName(name);
      if (!validation.isValid) {
        setNameError(validation.error || "");
      }
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

  const handleConfirmBlur = () => {
    if (confirm) {
      const validation = validateConfirmPassword(password, confirm);
      if (!validation.isValid) {
        setConfirmError(validation.error || "");
      }
    }
  };

  const handleSignup = async () => {
    if (isLoading) return;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmError("");

    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      setNameError(nameValidation.error || "");
      Swal.fire({
        title: "Validation Error",
        text: nameValidation.error,
        icon: "warning",
        background: "#1e1e1e",
        color: "#fff",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Got it",
      });
      return;
    }

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

    const confirmValidation = validateConfirmPassword(password, confirm);
    if (!confirmValidation.isValid) {
      setConfirmError(confirmValidation.error || "");
      Swal.fire({
        title: "Passwords don't match",
        text: "Please make sure both password fields are identical.",
        icon: "error",
        background: "#1e1e1e",
        color: "#fff",
        confirmButtonColor: "#d33",
        confirmButtonText: "Try again",
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

      if (usuario) {
        Swal.fire({
          title: "User already exists",
          text: "An account with this email already exists. Please log in instead.",
          icon: "warning",
          background: "#1e1e1e",
          color: "#fff",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Go to login",
        });
        return;
      }

      Swal.fire({
        title: "Welcome!",
        text: "Creating your account, please wait...",
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
      handleSignup();
    }
  };

  return (
    <div>
      <header>
        <div className="flex m-7 ml-[4.5vw] mb-2">
          <Image src="./logo.svg" alt="Logo" width={170} height={76} priority/>
          <h1 className="text-6xl pt-4 pl-7">Signup</h1>
        </div>
        <hr className="w-[90vw] ml-22 text-[#0067FE] border-t-4 border-[#0067FE] rounded-full"/>
      </header>
      <section className="flex mt-[7vw] justify-center">
        <div className="text-center p-10 pl-20 pr-20 w-[50vw] rounded-[5rem] border-5 border-[#0067FE] shadow-[0_0_100px_#0067FE] justify-items-start">
          <div className="text-left mb-6">
            <h1 className="text-5xl ml-5 mb-4">Name</h1>
            <input 
              placeholder="Your Name" 
              type="text" 
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className={`mb-2 placeholder:opacity-40 text-5xl w-[41vw] py-3 px-6 bg-[#12193A] rounded-4xl transition-all ${
                nameError ? "border-2 border-red-500" : ""
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {nameError && (
              <p className="text-red-500 text-xl ml-5 mt-2">{nameError}</p>
            )}
          </div>

          <div className="text-left mb-6">
            <h1 className="text-5xl mb-4 ml-5">Email</h1>
            <input 
              placeholder="name@email.com" 
              type="email" 
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className={`mb-2 placeholder:opacity-40 text-5xl w-[41vw] py-3 px-6 bg-[#12193A] rounded-4xl transition-all ${
                emailError ? "border-2 border-red-500" : ""
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {emailError && (
              <p className="text-red-500 text-xl ml-5 mt-2">{emailError}</p>
            )}
          </div>

          <div className="flex">
            <div className="pr-10 pt-1 w-[20vw]">
              <h1 className="text-5xl ml-5 text-left mb-4">Password</h1>
              <input 
                placeholder="**********" 
                type="password" 
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className={`mb-2 placeholder:opacity-40 text-5xl w-full py-3 px-6 bg-[#12193A] rounded-4xl transition-all ${
                  passwordError ? "border-2 border-red-500" : ""
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {passwordError && (
                <p className="text-red-500 text-xl ml-5 mt-2">{passwordError}</p>
              )}
            </div>
            <div className="pl-1 pt-1 w-[21vw]">
              <h1 className="text-5xl text-left mb-4 ml-5">Confirm</h1>
              <input 
                placeholder="**********" 
                type="password" 
                value={confirm}
                onChange={handleConfirmChange}
                onBlur={handleConfirmBlur}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className={`mb-2 placeholder:opacity-40 text-5xl w-full py-3 px-6 bg-[#12193A] rounded-4xl transition-all ${
                  confirmError ? "border-2 border-red-500" : ""
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {confirmError && (
                <p className="text-red-500 text-xl ml-5 mt-2">{confirmError}</p>
              )}
            </div>
          </div>

          <h1 className="mt-5 mb-4 text-2xl ml-5">
            Already have an account? Log in{" "}
            <Link href="/" className="text-[#0067FE] underline hover:text-[#3399FF]">
              Here
            </Link>.
          </h1>
          
          <button 
            onClick={handleSignup}
            disabled={isLoading}
            className={`px-15 text-5xl border-[#0067FE] border-2 p-2 rounded-full bg-[#0067FE] transition-all ${
              isLoading 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:bg-[#0052CC] hover:shadow-lg"
            }`}
          >
            {isLoading ? "Loading..." : "Signup"}
          </button>
        </div>
      </section>
    </div>
  );
}