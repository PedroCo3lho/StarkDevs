"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { connect } from "@starknet-io/get-starknet"; // v4.0.3+
import { WalletAccount } from "starknet"; // v6.18.0+

const myFrontendProviderUrl =
  "https://free-rpc.nethermind.io/sepolia-juno/v0_7";

interface WalletContext {
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => void;
  connection: WalletAccount | null;
}

const WalletContext = createContext<WalletContext | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [connection, setConnection] = useState<WalletAccount | null>(null);

  const connectToWallet = async () => {
    try {
      const selectedWalletSWO = await connect({
        modalMode: "alwaysAsk",
        modalTheme: "dark",
      });

      if (selectedWalletSWO) {
        const myWalletAccount = new WalletAccount(
          { nodeUrl: myFrontendProviderUrl },
          selectedWalletSWO
        );

        setConnection(myWalletAccount);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const login = async () => {
    await connectToWallet();
  };
  useEffect(() => {
    if (connection) {
      console.log(connection);
      console.log(connection.address);
    }
  }, [connection?.address]);

  const logout = () => {
    setConnection(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Optional: Auto-connect logic on component mount
    connectToWallet();
  }, []);

  return (
    <WalletContext.Provider value={{ isLoggedIn, connection, login, logout }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useAuth must be used within a WalletProvider");
  }
  return context;
};
