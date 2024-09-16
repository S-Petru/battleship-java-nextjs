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
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const handleSignInWithGoogle = async () => {
    try {
      const res = await signInWithGoogle();
      if (res != undefined) {
        sessionStorage.setItem("user", JSON.stringify(true));
        router.push("/");
      }
      setDisplayErrorMessage(true);

      setTimeout(() => {
        setDisplayErrorMessage(false);
      }, 2000);
    } catch (e) {
      console.error("Sign In Error:", e);
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res != undefined) {
        sessionStorage.setItem("user", JSON.stringify(true));
        router.push("/");
      }
      setDisplayErrorMessage(true);

      setTimeout(() => {
        setDisplayErrorMessage(false);
      }, 2000);
    } catch (e) {
      console.error("Sign In Error:", e);
    }
  };

  const handleNavigateToSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background-color">
      <div className="full flex w-[90%] flex-col items-center gap-4 rounded-lg bg-primary-color p-4">
        <h1 className="mb-4 text-4xl text-text-color">Sign In</h1>
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
            onClick={handleSignIn}
            className="h-[52px] w-full rounded bg-accent-color p-4 text-zinc-50 hover:opacity-85"
          >
            Sign In
          </button>

          <div className="flex items-center gap-2">
            <div className="h-[2px] w-full rounded-full bg-zinc-50"></div>
            <div className="text-zinc-50">OR</div>
            <div className="h-[2px] w-full rounded-full bg-zinc-50"></div>
          </div>

          <button
            onClick={handleSignInWithGoogle}
            className="flex w-full items-center justify-center rounded bg-zinc-50 p-4 text-accent-color hover:opacity-85"
          >
            <Image
              src="google-icon.svg"
              alt="Google Logo"
              width={20}
              height={20}
            />
          </button>

          <p
            className="mx-auto mt-4 cursor-pointer text-white/60 underline hover:text-white/85"
            onClick={handleNavigateToSignUp}
          >
            Don't have an account?
          </p>
        </div>
      </div>

      {error && displayErrorMessage && (
        <p className="text-red-500/80">{error.message}</p>
      )}

      {errorGoogle && displayErrorMessage && (
        <p className="mx-auto text-red-500/80">{errorGoogle.message}</p>
      )}
    </main>
  );
}
