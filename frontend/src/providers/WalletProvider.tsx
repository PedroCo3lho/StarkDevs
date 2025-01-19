"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { connect, disconnect, StarknetWindowObject } from "starknetkit";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";

interface WalletContext {
  isLoggedIn: boolean;
  address: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  connection: StarknetWindowObject | null;
}

const WalletContext = createContext<WalletContext | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [connection, setConnection] = useState<StarknetWindowObject | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null);

  const connectToStarknet = async () => {
    const { wallet, connectorData } = await connect({
      modalMode: "neverAsk",
      webWalletUrl: "https://web.argent.xyz",
    });

    if (wallet && connectorData) {
      setConnection(wallet);
      setAddress(connectorData.account as string);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    connectToStarknet();
  }, []);

  const login = async () => {
    try {
      const { wallet, connectorData } = await connect({
        modalMode: "alwaysAsk",
        webWalletUrl: "https://web.argent.xyz",
        dappName: "Greetings dApp",
      });

      if (wallet && connectorData) {
        setConnection(wallet);
        setAddress(connectorData.account as string);
        console.log(connectorData.account);
        setIsLoggedIn(true);
        console.log("CONNECTED", connectorData, wallet);
      }
    } catch (error) {
      console.error("LOGIN ERROR", error);
    }
  };

  const logout = async () => {
    await disconnect();
    setConnection(null);
    setAddress(null);
    setIsLoggedIn(false);
  };

  return (
    <WalletContext.Provider
      value={{ isLoggedIn, address, connection, login, logout }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(WalletContext);
  if (!context) { 
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
