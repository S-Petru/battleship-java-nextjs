"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

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
    <main className="flex h-screen flex-col items-center justify-around bg-gray-900 text-white">
      <h1 className="text-5xl font-bold">Landing Page</h1>
      {user || userSession ? (
        <>
          <button
            className="rounded bg-indigo-600 p-3"
            onClick={() => router.push("/game")}
          >
            Start Game
          </button>
          <p>Logged in as: {user?.email || "Session User"}</p>
          <button
            className="mt-4 rounded bg-red-600 p-3"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <button className="rounded bg-gray-600 p-3" disabled>
            Start Game
          </button>
          <button
            className="mt-4 rounded bg-indigo-600 p-3"
            onClick={() => router.push("/sign-in")}
          >
            Log In
          </button>
        </>
      )}
    </main>
  );
}
