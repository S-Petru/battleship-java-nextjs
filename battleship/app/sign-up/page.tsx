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
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

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
    // Display error message if any
    if (error) {
      setDisplayErrorMessage(true);
      setTimeout(() => {
        setDisplayErrorMessage(false);
      }, 3000); // Display for 3 seconds
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background-color">
      <div className="full flex w-[90%] flex-col items-center gap-4 rounded-lg bg-primary-color p-4">
        <h1 className="mb-4 text-4xl text-text-color">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded bg-secondary-color p-2 text-white placeholder-white/50 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded bg-secondary-color p-2 text-white placeholder-white/50 outline-none"
        />
        <div className="mt-4 flex w-full flex-col gap-2">
          <button
            onClick={handleSignUp}
            className="h-[52px] w-full rounded bg-accent-color p-4 text-zinc-50 hover:bg-accent-color/80"
          >
            Sign Up
          </button>

          <p
            className="mx-auto mt-4 cursor-pointer text-white/50 underline hover:text-white/70"
            onClick={() => router.push("/sign-in")}
          >
            Already have an account?
          </p>
        </div>
      </div>

      {error && displayErrorMessage && (
        <p className="mt-4 text-red-500/80">{error.message}</p>
      )}
    </main>
  );
}
