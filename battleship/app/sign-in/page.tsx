"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log("Firebase SignIn Response:", res); // Log the response
      // ! Cred ca if ul asta crea urmatoarea problema:
      // ? daca apasam pe sign-in primeam raspuns de la firebase
      // ? ca se facea sign-in, dar cred ca venea dupa ce se facea verificare de user in if
      // ? si era nevoie sa dau iar pe sign-in pentru ca a cum aveam un user si mergea redirect-ul
      // ? asa, fara if, pare ca functioneaza cum trebuie
      //if (user) {
      console.log("User Signed In:", user); // Log user information
      sessionStorage.setItem("user", JSON.stringify(true));
      router.push("/");
      //}
    } catch (e) {
      console.error("Sign In Error:", e); // Log any errors
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-96 rounded-lg bg-gray-800 p-10 shadow-xl">
        <h1 className="mb-5 text-2xl text-white">Sign In</h1>
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
          onClick={handleSignIn}
          className="w-full rounded bg-indigo-600 p-3 text-white hover:bg-indigo-500"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {error && <p className="mt-3 text-red-500">{error.message}</p>}
      </div>
    </div>
  );
}
