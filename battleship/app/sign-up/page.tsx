"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log("Firebase SignUp Response:", res); // Log the response
      if (user) {
        console.log("User Created:", user); // Log user information
        router.push("/");
      }
    } catch (e) {
      console.error("Sign Up Error:", e); // Log any errors
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-96 rounded-lg bg-gray-800 p-10 shadow-xl">
        <h1 className="mb-5 text-2xl text-white">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded bg-gray-700 p-3 text-white placeholder-gray-500 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded bg-gray-700 p-3 text-white placeholder-gray-500 outline-none"
        />
        <button
          onClick={handleSignUp}
          className="w-full rounded bg-indigo-600 p-3 text-white hover:bg-indigo-500"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        {error && <p className="mt-3 text-red-500">{error.message}</p>}
      </div>
    </div>
  );
}
