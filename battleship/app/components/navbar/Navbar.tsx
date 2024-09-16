import { useRouter } from "next/navigation";
import { useState } from "react";

import Menu from "../menu/Menu";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setMenu] = useState(false);

  const goToMainPage = () => {
    router.push("/");
  };

  return (
    <main className="fixed top-0 w-full bg-primary-color">
      <div className="mx-auto flex w-[90%] items-center justify-between py-4">
        <h6
          onClick={goToMainPage}
          className="cursor-pointer text-2xl font-bold text-text-color"
        >
          Battleship
        </h6>

        <div
          onClick={() => setMenu(!isMenuOpen)}
          className="flex h-8 w-8 cursor-pointer flex-col items-center justify-around"
        >
          {!isMenuOpen ? (
            <>
              <div className="h-[3px] w-[90%] rounded-full bg-text-color"></div>
              <div className="h-[3px] w-[90%] rounded-full bg-text-color"></div>
              <div className="h-[3px] w-[90%] rounded-full bg-text-color"></div>
            </>
          ) : (
            <>
              <div className="h-[3px] w-[90%] translate-y-[8px] rotate-45 transform rounded-full bg-text-color"></div>
              <div className="h-[3px] w-[90%] -translate-y-[8px] -rotate-45 transform rounded-full bg-text-color"></div>
            </>
          )}
        </div>
      </div>

      <Menu isMenuOpen={isMenuOpen} />
    </main>
  );
}