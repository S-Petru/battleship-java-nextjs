"use client";

import { useState } from "react";
import Navbar from "../components/navbar/Navbar";

export default function Settings() {
  const [musicVolume, setMusicVolume] = useState(5);
  const [sfxVolume, setSfxVolume] = useState(5);

  return (
    <main className="bg-background-color">
      <Navbar />
      <div className="flex h-screen w-full flex-col gap-10 py-24">
        <h2 className="mx-auto mb-8 text-center text-4xl">Settings</h2>

        <section className="mx-auto flex w-[90%] flex-col justify-center gap-4">
          <h3 className="text-2xl">Sound settings</h3>

          <div>
            <label
              htmlFor="music-range"
              className="mb-1 block text-lg font-medium text-gray-900"
            >
              Music Volume: {musicVolume}
            </label>
            <input
              id="music-range"
              type="range"
              min="0"
              max="10"
              value={musicVolume}
              onChange={(e) => setMusicVolume(Number(e.target.value))}
              step="1"
              className="h-2 w-[80%] cursor-pointer appearance-none rounded-lg bg-accent-color"
            />
          </div>

          <div>
            <label
              htmlFor="sfx-range"
              className="mb-1 block text-lg font-medium text-gray-900"
            >
              SFX Volume: {sfxVolume}
            </label>
            <input
              id="sfx-range"
              type="range"
              min="0"
              max="10"
              value={sfxVolume}
              onChange={(e) => setSfxVolume(Number(e.target.value))}
              step="1"
              className="h-2 w-[80%] cursor-pointer appearance-none rounded-full bg-accent-color"
            />
          </div>

          <button className="w-fit rounded-lg bg-accent-color px-4 py-2 text-white">
            Save
          </button>
        </section>

        <section className="mx-auto flex w-[90%] flex-col justify-center gap-2">
          <h3 className="text-2xl">Account settings:</h3>
          <button className="w-fit rounded-md bg-red-500/80 px-4 py-2 text-zinc-50">
            Delete Account
          </button>
        </section>
      </div>
    </main>
  );
}
