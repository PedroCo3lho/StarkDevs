"use client";
import { MdAttachMoney } from "react-icons/md";
import { MdDinnerDining } from "react-icons/md";
import { IoIosConstruct } from "react-icons/io";

export const tasks = [
  {
    id: 1,
    name: "Dinner Event",
    Icon: MdDinnerDining,
    desc: `This code represents a Starknet smart contract for managing a dinner event.
    
It allows users to join a guest list, cancel their reservation, and check the number of guests and the host of the event. However, the contract is incomplete.


`,
    challenges: [
      "Setting the host in the constructor.",
      "Allowing users to join the guest list, ensuring they pay the correct ticket price.",
      "Allowing users to cancel their reservation, ensuring they are on the guest list.",
      "Retrieving the total number of guests.",
      "Retrieving the host of the event.",
    ],
    code: `/// Starknet contract for a dinner event.
    use core::starknet::{ContractAddress};
    #[starknet::interface]
    pub trait IDinnerEvent<TContractState> {
        /// Adds the caller to the guest list.
        fn join_guest_list(ref self: TContractState, amount: u8);
        /// Removes the caller from the guest list.
        fn cancel_reservation(ref self: TContractState);
        /// Returns the number of guests.
        fn get_guests_number(self: @TContractState) -> u256;
        /// Returns the host of the event.
        fn get_host(self: @TContractState) -> ContractAddress;
    }

    /// Starknet smart contract for a dinner event.
    #[starknet::contract]
    mod DinnerEvent {
        use starknet::storage::{
            StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map,
        };
        use core::starknet::{ContractAddress, get_caller_address};

        const TICKET_PRICE:u8 = 10;

        #[storage]
        struct Storage {
            host: ContractAddress,
            guests: Map<ContractAddress, bool>,
            guests_count: u256,
        }

        #[constructor]
        fn constructor(ref self: ContractState, host: ContractAddress) {
            // TODO: Set the host.
        }

        #[abi(embed_v0)]
        impl DinnerEventImpl of super::IDinnerEvent<ContractState> {
            fn join_guest_list(ref self: ContractState, amount: u8) {
              // TODO: Implement the join_guest_list function, ensure that the amount is equal to TICKET_PRICE.
            }

            fn cancel_reservation(ref self: ContractState) {
              // TODO: Implement the cancel_reservation function, ensure that the caller is in the guest list.
            }

            fn get_guests_number(self: @ContractState) -> u256 {
              // TODO: Implement the get_guests_number function.
            }

            fn get_host(self: @ContractState) -> ContractAddress {
              // TODO: Implement the get_host function.
            }
        }
    }


    // ---------------- DO NOT CHANGE ANYTHING BELOW THIS LINE ----------------

    use snforge_std::{ContractClassTrait, DeclareResultTrait, declare};

    fn deploy_contract(name: ByteArray) -> ContractAddress {
        let contract = declare(name).unwrap().contract_class();
        let mut calldata = ArrayTrait::new();
        calldata.append('Satoshi');
        let (contract_address, _) = contract.deploy(@calldata).unwrap();
        contract_address
    }

    #[test]
    fn test_deploy() {
        let contract_address = deploy_contract("DinnerEvent");

        let dispatcher = IDinnerEventDispatcher { contract_address };
        let host = dispatcher.get_host();
        assert(host == 'Satoshi'.try_into().unwrap(), 'Owner should be Satoshi');
    }


    #[test]
    fn test_join_guest_list() {
        let contract_address = deploy_contract("DinnerEvent");

        let dispatcher = IDinnerEventDispatcher { contract_address };
        let guests_before = dispatcher.get_guests_number();
        assert(guests_before == 0, 'Invalid number of guests');

        dispatcher.join_guest_list(10);

        let guests_after = dispatcher.get_guests_number();
        assert(guests_after == 1, 'Invalid number of guests');
    }

    #[test]
    fn test_cancel_reservation() {
        let contract_address = deploy_contract("DinnerEvent");

        let dispatcher = IDinnerEventDispatcher { contract_address };
        dispatcher.join_guest_list(10);

        let guests_before = dispatcher.get_guests_number();
        assert(guests_before == 1, 'Invalid number of guests');

        dispatcher.cancel_reservation();

        let guests_after = dispatcher.get_guests_number();
        assert(guests_after == 0, 'Invalid number of guests');
    }
    `,
  },
  {
    id: 2,
    name: "E-commerce",
    Icon: IoIosConstruct,
  },
  {
    id: 3,
    name: "Social media",
    Icon: IoIosConstruct,
  },
  {
    id: 4,
    name: "E-learning",
    Icon: IoIosConstruct,
  },
  {
    id: 5,
    name: "Health project",
    Icon: IoIosConstruct,
  },
  {
    id: 6,
    name: "E-commerce",
    Icon: IoIosConstruct,
  },
];
