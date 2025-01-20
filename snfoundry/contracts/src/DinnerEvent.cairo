/// Interface representing `HelloContract`.
/// This interface allows modification and retrieval of the contract balance.
use core::starknet::{ContractAddress};
#[starknet::interface]
pub trait IDinnerEvent<TContractState> {
    /// Adds the caller to the guest list.
    fn join_guest_list(ref self: TContractState, amount: u8);
    
    /// Removes the caller from the guest list.
    fn cancel_reservation(ref self: TContractState);

    /// Returns the number of guests.
    fn get_guests_number(self: @TContractState) -> u256;

    fn get_host(self: @TContractState) -> ContractAddress;
}

/// Simple contract for managing balance.
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
        self.host.write(host);
    }

    #[abi(embed_v0)]
    impl DinnerEventImpl of super::IDinnerEvent<ContractState> {
        fn join_guest_list(ref self: ContractState, amount: u8) {
            assert(amount == TICKET_PRICE, 'Amount should be 10');
            let caller = get_caller_address();
            self.guests.entry(caller).write(true);
            self.guests_count.write(self.guests_count.read() + 1);
        }

        fn cancel_reservation(ref self: ContractState) {
            let caller = get_caller_address();
            self.guests.entry(caller).write(false);
            self.guests_count.write(self.guests_count.read() - 1);
        }

        fn get_guests_number(self: @ContractState) -> u256 {
            self.guests_count.read()
        }

        fn get_host(self: @ContractState) -> ContractAddress {
            self.host.read()
        }
    }
}