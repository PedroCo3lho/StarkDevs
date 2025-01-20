import { useAuth } from "@/providers/WalletProvider";
import { MotionButton } from "../ui/MotionButton";
import { useRouter } from "next/navigation";
import { MotionDiv } from "../ui/MotionDiv";

export const NavBar = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex justify-center relative w-full px-10 py-5  ">
      {" "}
      <MotionDiv>
        <p
          className="text-4xl font-bold cursor-pointer "
          onClick={() => router.push("/")}
        >
          Stark Devs
        </p>
      </MotionDiv>
      {isLoggedIn ? (
        <div className="right-0 absolute flex gap-4 items-center right-8 ">
          <MotionButton
            label="Logout"
            func={logout}
            type="button"
            className="bg-zinc-200 text-black hover:glow-white-md font-bold "
          />
        </div>
      ) : (
        <MotionButton
          label="Connect Wallet"
          func={login}
          type="button"
          className="text-black absolute bg-zinc-200 text-black hover:glow-white-md font-bold right-8"
        />
      )}
    </div>
  );
};
