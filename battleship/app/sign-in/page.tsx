"use client";
import { useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    try {
      const res = await signInWithGoogle();
      if (res != undefined) {
        console.log("User Signed In:", userGoogle);
        sessionStorage.setItem("user", JSON.stringify(true));
        router.push("/");
      }
    } catch (e) {
      console.error("Sign In Error:", e);
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log("Firebase SignIn Response:", res); // Log the response
      if (res != undefined) {
        console.log("User Signed In:", user);
        sessionStorage.setItem("user", JSON.stringify(true));
        router.push("/");
      }
    } catch (e) {
      console.error("Sign In Error:", e);
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

        <div className="my-4 flex items-center gap-2">
          <div className="h-[2px] w-full rounded-full bg-white"></div>
          <div className="text-white">OR</div>
          <div className="h-[2px] w-full rounded-full bg-white"></div>
        </div>

        <button
          onClick={handleSignInWithGoogle}
          className="flex w-full items-center justify-center rounded bg-zinc-50 p-3 text-xl font-bold text-red-500 hover:bg-indigo-500"
        >
          {loadingGoogle ? (
            "Signing In..."
          ) : (
            <Image
              src="google-icon.svg" // Path to your Google logo
              alt="Google Logo"
              width={16} // Adjust width and height as per your design
              height={16}
            />
          )}
        </button>
        {errorGoogle && (
          <p className="mt-3 text-red-500">{errorGoogle.message}</p>
        )}
      </div>
    </div>
  );
}
