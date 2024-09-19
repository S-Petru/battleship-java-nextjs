"use client";

import Navbar from "../components/navbar/Navbar";

export default function Settings() {
  return (
    <main className="bg-background-color">
      <Navbar />
      <div className="h-screen w-full py-20">
        <h1>Settings</h1>

        <section className="mx-auto w-[90%]">
          <button className="rounded-md bg-red-500/80 px-4 py-2 text-zinc-50">
            Delete Account
          </button>
        </section>
      </div>
    </main>
  );
}
