"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

import Navbar from "./components/navbar/Navbar";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [userSession, setUserSession] = useState<boolean | null>(null);

  // Check if sessionStorage is available (i.e., the code is running in the browser)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionUser = sessionStorage.getItem("user");
      setUserSession(sessionUser ? JSON.parse(sessionUser) : null);
    }
  }, []);

  console.log("AuthState User:", user); // Log user state from Firebase Auth
  console.log("SessionStorage User:", userSession); // Log user session from sessionStorage

  // useEffect(() => {
  //   if (!user && !userSession && !loading) {
  //     router.push("/sign-in");
  //   }
  // }, [user, userSession, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User Logged Out"); // Log logout action
      sessionStorage.removeItem("user");
      setUserSession(null);
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout Error:", error); // Log any errors during logout
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-background-color text-white">
      <Navbar />

      <div className="flex w-[90%] flex-col gap-12">
        <h1 className="mb-24 w-full text-center text-5xl font-bold text-text-color">
          Welcome to Battleship
        </h1>

        <div className="flex flex-col gap-4">
          {user || userSession ? (
            <>
              <button
                className="mx-auto w-fit rounded bg-accent-color p-4"
                onClick={() => router.push("/")}
              >
                Join a Game
              </button>

              <button
                className="mx-auto w-fit rounded bg-accent-color p-4"
                onClick={() => router.push("/")}
              >
                Create a Game
              </button>

              <button
                className="mx-auto mt-4 w-fit rounded bg-red-500/90 p-4"
                onClick={handleLogout}
              >
                Log Out
              </button>
              <p className="mx-auto text-text-color">
                Logged in as: {user?.email || "Session User"}
              </p>
            </>
          ) : (
            <>
              <button
                className="mx-auto w-fit rounded bg-gray-600 p-4"
                disabled
              >
                Join a Game
              </button>
              <button
                className="mx-auto w-fit rounded bg-gray-600 p-4"
                disabled
              >
                Create Game
              </button>
              <button
                className="mx-auto mt-12 w-fit rounded bg-accent-color p-4"
                onClick={() => router.push("/sign-in")}
              >
                Log In
              </button>
              <p className="mx-auto text-sm font-light text-text-color">
                (!) In Order to play, you must log in
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
