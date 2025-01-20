"use client";

import { useCall, useContract, useNetwork } from "@starknet-react/core";
import { MotionButton } from "../ui/MotionButton";
import { useEffect, useState } from "react";
import { RpcProvider } from "starknet";
import { useAccount } from "@starknet-react/core";
import { useConnect } from "@starknet-react/core";
import { useAuth } from "@/providers/WalletProvider";
import { toast } from "react-toastify";

export const TestContractUi = () => {
  const { connection } = useAuth();
  const [amount, setAmount] = useState<number>(0);

  const CONTRACT_ADDRESS =
    "0x217f0cfb5f5581adf5bc99620003c51633768ce7e57cae6742bdf85561ebb7b";

  const abi = [
    {
      type: "impl",
      name: "DinnerEventImpl",
      interface_name: "contracts::DinnerEvent::IDinnerEvent",
    },
    {
      type: "struct",
      name: "core::integer::u256",
      members: [
        {
          name: "low",
          type: "core::integer::u128",
        },
        {
          name: "high",
          type: "core::integer::u128",
        },
      ],
    },
    {
      type: "interface",
      name: "contracts::DinnerEvent::IDinnerEvent",
      items: [
        {
          type: "function",
          name: "join_guest_list",
          inputs: [
            {
              name: "amount",
              type: "core::integer::u8",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "cancel_reservation",
          inputs: [],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "get_guests_number",
          inputs: [],
          outputs: [
            {
              type: "core::integer::u256",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_host",
          inputs: [],
          outputs: [
            {
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          state_mutability: "view",
        },
      ],
    },
    {
      type: "constructor",
      name: "constructor",
      inputs: [
        {
          name: "host",
          type: "core::starknet::contract_address::ContractAddress",
        },
      ],
    },
    {
      type: "event",
      name: "contracts::DinnerEvent::DinnerEvent::Event",
      kind: "enum",
      variants: [],
    },
  ] as const;

  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io/",
  });

  const { contract } = useContract({
    abi,
    address: CONTRACT_ADDRESS,
    provider: provider,
  });

  useEffect(() => {
    console.log(contract);
  }, [contract]);

  function teste() {
    `
        `;
  }

  async function GetHost() {
    if (contract) {
      const res = await contract.functions.get_host();
      console.log(res);
      toast.success("Host: " + res);
    } else {
      console.error("Contract is undefined");
    }
  }

  async function GetGuestsNumber() {
    if (contract) {
      const res = await contract.functions.get_guests_number();
      console.log(res);
      toast.success("Guests number: " + res);
    } else {
      console.error("Contract is undefined");
    }
  }

  async function CancelReservation() {
    if (contract) {
      const myCall = contract.populate("cancel_reservation");

      if (myCall.calldata) {
        if (connection) {
          const resp = await connection.execute(myCall);
          if (resp.transaction_hash) {
            toast.success(
              `Transaction sent successfully: ${resp.transaction_hash}`
            );
          }
        } else {
          console.error("Connection is null");
        }
      } else {
        console.error("Calldata is undefined");
      }
    } else {
      console.error("Contract is undefined");
    }
  }

  async function JoinGuestList() {
    if (contract) {
      const myCall = contract.populate("join_guest_list", [amount]);

      if (myCall.calldata) {
        if (connection) {
          const resp = await connection.execute(myCall);
          console.log(resp);
          console.log(resp.transaction_hash);
          if (resp.transaction_hash) {
            toast.success(
              `Transaction sent successfully: ${resp.transaction_hash}`
            );
          }
        } else {
          console.error("Connection is null");
        }
      } else {
        console.error("Calldata is undefined");
      }
    } else {
      console.error("Contract is undefined");
    }
  }
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <p className="text-3xl font-bold">Test contract interface</p>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">fn join_guest_list</p>
          <div className="flex flex-col gap-2">
            <p>amount (u8)</p>
            <div className="flex w-full gap-2">
              <input
                placeholder="0"
                className="w-2/4 border px-2 rounded-lg text-black py-2"
                type="number"
                min={0}
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              ></input>
              <MotionButton
                label="Execute"
                func={JoinGuestList}
                type="button"
                className="bg-zinc-200 text-black font-bold w-24 hover:glow-white-md"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">fn cancel_reservation</p>
          <MotionButton
            label="Execute"
            func={CancelReservation}
            type="button"
            className="bg-zinc-200 text-black font-bold w-24 hover:glow-white-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">fn get_guests_number</p>
          <MotionButton
            label="Execute"
            func={GetGuestsNumber}
            type="button"
            className="bg-zinc-200 text-black font-bold w-24 hover:glow-white-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">fn get_host</p>
          <MotionButton
            label="Execute"
            func={GetHost}
            type="button"
            className="bg-zinc-200 text-black font-bold w-24 hover:glow-white-md"
          />
        </div>
      </div>
    </div>
  );
};
