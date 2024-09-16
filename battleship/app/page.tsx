"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";

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
    <main className="flex h-screen flex-col items-center justify-around bg-background-color text-white">
      <Navbar />

      <h1 className="text-5xl font-bold text-text-color">Landing Page</h1>
      {user || userSession ? (
        <>
          <button
            className="rounded bg-accent-color p-4"
            onClick={() => router.push("/game")}
          >
            Start Game
          </button>
          <p className="text-text-color">
            Logged in as: {user?.email || "Session User"}
          </p>
          <button
            className="mt-4 rounded bg-red-500/90 p-4"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <button className="rounded bg-gray-600 p-4" disabled>
            Start Game
          </button>
          <button
            className="mt-4 rounded bg-accent-color p-4"
            onClick={() => router.push("/sign-in")}
          >
            Log In
          </button>
        </>
      )}
    </main>
  );
}
