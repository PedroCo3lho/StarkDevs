import { MdAttachMoney } from "react-icons/md";
import { MotionDiv } from "../ui/MotionDiv";
import { useRouter } from "next/navigation";

export const TaskModal = ({
  id,
  taskName,
  Icon,
}: {
  id: number;
  taskName: string;
  Icon: any;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/task/${id}`)}
      className="flex flex-col items-center justify-center gap-2 drop-shadow-2xl"
    >
      <MotionDiv className="flex flex-col items-center justify-center w-40 h-40 gap-6 bg-[#F8F6F6] border border-gray-500 rounded-2xl hover:border-2 transition-colors duration-700 ">
        <MdAttachMoney className="text-7xl text-gray-500" />
      </MotionDiv>
      <p className="text-xl font-bold">{taskName}</p>
    </div>
  );
};
