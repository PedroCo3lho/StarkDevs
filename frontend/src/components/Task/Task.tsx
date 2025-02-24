"use client";

import dynamic from "next/dynamic";
import { NavBar } from "../NavBar/NavBar";
import { dynamicModules } from "ace-builds-internal/config";
import { useEffect, useState } from "react";
import { MotionButton } from "../ui/MotionButton";
import { tasks } from "../../utils/arrayMock";
import { runCairoCode } from "@/utils/runCairoCode";
import __wbg_init from "wasm-cairo";
import { TestContractUi } from "../TestContractUi/TestContractUi";
import { toast } from "react-toastify";
const Ide = dynamic(() => import("../Ide/Ide"), { ssr: false });

export const Task = ({ id }: { id: number }) => {
  useEffect(() => {
    __wbg_init();
  }, []);
  const [codeData, setData] = useState<any>(tasks[id - 1].code);
  const [isTestUiVisible, setTestUiVisible] = useState<boolean>(false);
  const [isTestUiEnabled, setTestUiEnabled] = useState<boolean>(false);

  function handleTestUi() {
    setTestUiVisible(!isTestUiVisible);
  }
  const verifyCode = async () => {
    const result = await runCairoCode(codeData, "COMPILE");
    console.log("RESULT: ", result);
    if (result.success) {
      toast.success("Code compiled successfully!");
      setTestUiEnabled(true);
    } else {
      toast.error("Code compilation failed!");
    }
  };

  return (
    <div className="w-full h-full flex justify-start items-center flex-col ">
      <NavBar />
      <div className="w-full h-full px-5 pb-5 flex flex-col gap-5">
        <div className="w-full h-full flex border-2 rounded-xl overflow-hidden border-gray-500 relative z-0">
          <div className="w-[30%] h-full bg-transparent p-5 flex flex-col gap-4 justify-between items-end">
            {isTestUiVisible ? (
              <TestContractUi />
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <p className="text-3xl font-bold">{tasks[id - 1].name}</p>{" "}
                <p className="text-lg whitespace-pre-wrap">
                  {tasks[id - 1].desc}
                </p>
                <p className="text-xl font-bold">Challenge:</p>
                <p className="text-lg">
                  The developer needs to complete the {tasks[id - 1].name}{" "}
                  contract by implementing the following functionalities:
                </p>
                <div className="flex flex-col gap-4">
                  {tasks[id - 1].challenges?.map(
                    (challenge: string, index: number) => (
                      <li key={index} className="text-lg">
                        {challenge}
                      </li>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {isTestUiEnabled ? (
                <MotionButton
                  label={isTestUiVisible ? "Close" : "Open Test UI"}
                  type="button"
                  func={handleTestUi}
                  className="
              w-fit bg-zinc-200 text-black font-bold hover:glow-white-md"
                />
              ) : (
                <MotionButton
                  label={"Open Test UI"}
                  type="button"
                  func={() => toast.error("Please compile the code first!")}
                  className="
            w-fit border border-zinc-200/70 text-zinc-200/70 font-bold hover:glow-white-md"
                />
              )}
              <MotionButton
                label="Compile"
                type="button"
                func={verifyCode}
                className="
            w-fit px-2 bg-zinc-200 text-black font-bold hover:glow-white-md"
              />
              <p className="text-xs absolute bottom-2 left-2">
                (compiling will freeze for a few seconds)*
              </p>
            </div>
          </div>
          <Ide initalValue={codeData} dataState={setData} />
        </div>
      </div>
    </div>
  );
};
