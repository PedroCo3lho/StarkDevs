"use client";

import dynamic from "next/dynamic";
import { NavBar } from "../NavBar/NavBar";
import { dynamicModules } from "ace-builds-internal/config";
import { useEffect, useState } from "react";
import { MotionButton } from "../ui/MotionButton";
import { tasks } from "../../utils/arrayMock";
const Ide = dynamic(() => import("../Ide/Ide"), { ssr: false });

export const Task = ({ id }: { id: number }) => {
  const [codeData, setData] = useState<string>("");

  function verifyCode() {
    console.log(codeData);
  }

  return (
    <div className="w-full h-full flex justify-start items-center flex-col ">
      <NavBar />
      <div className="w-full h-full px-5 pb-5 ">
        <div className="w-full h-full flex border-2 rounded-xl overflow-hidden border-gray-500 relative z-0">
          <div className="w-2/5 h-full bg-white p-5">
            <p className="text-3xl fotn-bold">{tasks[id].name}</p>
          </div>
          <Ide dataState={setData} />
          <MotionButton
            label="Verify"
            type="button"
            func={verifyCode}
            className="absolute right-2 bottom-2 !z-10 bg-gray-500 text-white font-bold"
          />
        </div>
      </div>
    </div>
  );
};
