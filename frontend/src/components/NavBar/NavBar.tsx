import { useAuth } from "@/providers/WalletProvider";
import { MotionButton } from "../ui/MotionButton";

export const NavBar = () => {
  const { isLoggedIn, login, address, logout } = useAuth();

  return (
    <div className="flex justify-center relative w-full px-10 py-5 ">
      {" "}
      <p className="text-4xl font-bold">Stark Devs</p>
      {isLoggedIn && address ? (
        <div className="right-0 absolute flex gap-4 items-center right-8 ">
          <p className="text-black ">{address.slice(0, 10)}...</p>
          <MotionButton
            label="Logout"
            func={logout}
            type="button"
            className="bg-gray-500 text-white font-bold "
          />
        </div>
      ) : (
        <MotionButton
          label="Connect Wallet"
          func={login}
          type="button"
          className="text-black absolute bg-gray-500 text-white font-bold right-8"
        />
      )}
    </div>
  );
};
