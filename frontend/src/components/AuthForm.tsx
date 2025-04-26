"use client";
import { useState } from "react";

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call your API here
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-4 max-w-md mx-auto mt-16"
    >
      <h2 className="text-2xl font-bold text-green-700 mb-2">
        {type === "login" ? "Login" : "Sign Up"}
      </h2>
      <input
        type="email"
        placeholder="Email"
        className="border rounded px-4 py-2"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border rounded px-4 py-2"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {type === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
}