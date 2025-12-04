"use client";

import { useEffect, useState } from "react";

export default function ProfileAlert() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    localStorage.setItem("usernameaux", value);
    setUsername(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    localStorage.setItem("emailaux", value);
    setEmail(value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    localStorage.setItem("currencyaux", value);
    setCurrency(value);
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
    setEmail(localStorage.getItem("email") || "");
    setCurrency(localStorage.getItem("currency") || "COP");
  }, []);

  return (
    <div className="text-left mb-6">
      <h1 className="text-5xl ml-5 mb-4 text-white">Name</h1>
      <input
        value={username}
        onChange={handleUsernameChange}
        placeholder="Your Name"
        type="text"
        className={`mb-2 placeholder:opacity-40 text-5xl w-[41vw] py-3 px-6 bg-[#12193A] rounded-4xl transition-all`}
      />

      <h1 className="text-5xl ml-5 mb-4 text-white">Email</h1>
      <input
        value={email}
        onChange={handleEmailChange}
        placeholder="name@email.com"
        type="email"
        className={`mb-2 placeholder:opacity-40 text-5xl w-[41vw] py-3 px-6 bg-[#12193A] rounded-4xl transition-all`}
      />

      <h1 className="text-5xl ml-5 mb-4 text-white">Currency</h1>
      <select
        className="mb-2 placeholder:opacity-90 text-5xl w-[41vw] py-3 px-6 bg-[#12193A] rounded-4xl transition-all appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("/Arrow.svg")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1.5rem center',
          backgroundSize: '2.5rem',
          paddingRight: '4rem'
        }}
        onChange={handleCurrencyChange}
        value={currency}
      >
        <option value="EUR">EUR</option>
        <option value="COP">COP</option>
        <option value="USD">USD</option>
      </select>
    </div>
  );
}