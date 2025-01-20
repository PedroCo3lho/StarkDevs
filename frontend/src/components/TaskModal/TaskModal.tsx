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
      <MotionDiv className="flex flex-col items-center justify-center w-40 h-40 gap-6 bg-transparent card-wrapper rounded-2xl hover:glow-blue-500-lg transition-colors duration-700 ">
        <div className="card-content flex items-center justify-center w-full h-full">
          <Icon className="text-7xl text-gray-500" />
        </div>
      </MotionDiv>
      <p className="text-xl font-bold">{taskName}</p>
    </div>
  );
};
