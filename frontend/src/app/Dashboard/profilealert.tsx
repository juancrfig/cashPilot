"use client";

import { useEffect, useState } from "react";

export default function ProfileAlert() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
    setEmail(localStorage.getItem("email") || "");
  }, []);

  return (
    <div className="text-left mb-6">
      <h1 className="text-5xl ml-5 mb-4 text-white">Name</h1>
      <input
        defaultValue={username}
        placeholder="Your Name"
        type="text"
        className={`mb-2 placeholder:opacity-40 text-5xl w-[41vw] py-3 px-6 bg-[#12193A] rounded-4xl transition-all`}
      />

      <h1 className="text-5xl ml-5 mb-4 text-white">Email</h1>
      <input
        defaultValue={email}
        placeholder="name@email.com"
        type="email"
        className={`mb-2 placeholder:opacity-40 text-5xl w-[41vw] py-3 px-6 bg-[#12193A] rounded-4xl transition-all`}
      />

      <h1 className="text-5xl ml-5 mb-4 text-white">Currency</h1>
      <select
        className="mb-2 placeholder:opacity-90 text-5xl w-[41vw] py-3 px-6 bg-[#12193A] rounded-4xl transition-all"
      >
        <option value="">COP</option>
        <option value="op1">EUR</option>
        <option value="op2">USA</option>
      </select>
    </div>
  );
}
