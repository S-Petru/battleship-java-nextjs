"use client";

import Navbar from "../components/navbar/Navbar";

export default function Stats() {
  const gridItems = Array.from({ length: 36 });

  return (
    <main className="bg-background-color">
      <Navbar />
      <div className="mx-auto h-fit w-[90%] py-24">
        <h2 className="mx-auto mb-8 text-center text-4xl">Stats</h2>
        <section className="flex flex-col">
          <div className="flex flex-col items-center gap-2 text-2xl">
            <p>Battles</p>
            <p className="">64</p>
          </div>

          <div className="flex justify-evenly text-xl">
            <div className="flex flex-col gap-2">
              <p>Won</p>
              <p className="text-center">40</p>
            </div>

            <div className="flex flex-col gap-2">
              <p>Lost</p>
              <p className="text-center">24</p>
            </div>
          </div>

          <div className="my-8 h-1 w-full rounded-full bg-accent-color"></div>

          <div className="flex flex-col items-center gap-2 text-2xl">
            <p>Accuracy</p>
            <p className="">37%</p>
          </div>

          <div className="flex justify-evenly text-xl">
            <div className="flex flex-col gap-2">
              <p>Hit</p>
              <p className="text-center">37</p>
            </div>

            <div className="flex flex-col gap-2">
              <p>Miss</p>
              <p className="text-center">63</p>
            </div>
          </div>

          <div className="my-8 h-1 w-full rounded-full bg-accent-color"></div>

          <div className="flex flex-col items-center gap-2 text-2xl">
            <p>Heatmap</p>

            <div className="grid h-60 w-60 grid-cols-6 grid-rows-6 border-2 border-slate-600">
              {gridItems.map((_, index) => (
                <div key={index} className="border border-slate-400"></div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
