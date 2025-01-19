"use client";
import { NavBar } from "@/components/NavBar/NavBar";
import { TaskModal } from "@/components/TaskModal/TaskModal";
import { MotionButton } from "@/components/ui/MotionButton";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { useAuth } from "@/providers/WalletProvider";
import { MdAttachMoney } from "react-icons/md";
import { tasks } from "../utils/arrayMock";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col ">
      <NavBar />
      <div className="w-fit h-full items-center flex flex-wrap gap-10 p-10 overflow-y-auto justify-center">
        {tasks.map((task, index) => (
          <TaskModal
            key={index}
            id={task.id}
            taskName={task.name}
            Icon={task.Icon}
          />
        ))}
      </div>
    </div>
  );
}
