use core::starknet::ContractAddress;

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

#[starknet::contract]
mod DinnerEvent {
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map,
    };
    use core::starknet::{ContractAddress, get_caller_address};

    const TICKET_PRICE: u8 = 10;

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

#[cfg(test)]
mod test {
    use starknet::ContractAddress;
    use super::IDinnerEventDispatcher;
    use super::IDinnerEventDispatcherTrait;
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
}

