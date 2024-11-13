"use client";

import Navbar from "../components/navbar/Navbar";
import { useState } from "react";

export default function Profile() {
  const [isPasswordVisible, togglePasswordVisibility] = useState(false);

  let currentUsername = "currentUsr";
  let currentEmail = "current@Email";
  let currentPassword = "currentPassword";

  return (
    <main className="bg-background-color text-text-color">
      <Navbar />
      <div className="mx-auto h-screen w-[90%] py-24">
        <h1 className="mx-auto mb-8 text-center text-4xl">Profile</h1>

        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border-4 border-accent-color text-4xl">
          <p>{currentUsername[0]}</p>
        </div>

        <section className="mx-auto mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <p>Username:</p>
              <input
                className="rounded-md border-2 border-text-color bg-inherit p-1"
                type="text"
                value={currentUsername}
              />
            </div>

            <div>
              <p>Email:</p>
              <input
                className="rounded-md border-2 border-text-color bg-inherit p-1"
                type="text"
                value={currentEmail}
              />
            </div>

            <div>
              <p>Password:</p>
              <div className="flex items-center gap-2">
                <input
                  className="rounded-md border-2 border-text-color bg-inherit p-1"
                  type={`${isPasswordVisible ? "text" : "password"}`}
                  placeholder="passwordPlaceholder"
                  value={currentPassword}
                />

                {isPasswordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-7"
                    onClick={() => togglePasswordVisibility(!isPasswordVisible)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-7"
                    onClick={() => togglePasswordVisibility(!isPasswordVisible)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </div>
            </div>

            <button className="w-fit rounded-md bg-accent-color px-4 py-2 text-zinc-50">
              Save
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
