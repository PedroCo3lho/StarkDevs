import type { Metadata } from "next";

import "./globals.css";
import { WalletProvider } from "@/providers/WalletProvider";

export const metadata: Metadata = {
  title: "StarkDevs",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F8F6F6]  flex flex-col justify-start items-center border text-black border-black h-screen">
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}