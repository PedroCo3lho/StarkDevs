/// Interface representing `HelloContract`.
/// This interface allows modification and retrieval of the contract balance.
#[starknet::interface]
pub trait IFundRaising<TContractState> {
    /// Checks if the caller is an owner
    fn is_owner(self: @TContractState) -> bool; // todo
    fn only_owner(self: @TContractState);
    /// Increase contract balance.
    fn deposit(ref self: TContractState, amount: felt252);
    /// Decrease contract balance.
    fn withdraw(ref self: TContractState, amount: felt252); // todo
    /// Retrieve contract balance.
    fn get_balance(self: @TContractState) -> felt252;
    /// Retrive the owner wallet address
    fn get_owner_address(self: @TContractState) -> felt252; // todo
}

/// Simple contract for managing balance.
#[starknet::contract]
mod FundRaising {
    use core::starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use core::starknet::ContractAddress;
    use core::starknet::get_caller_address;

    #[storage]
    struct Storage {
        owner: ContractAddress,
        balance: felt252,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.owner.write(get_caller_address());
    }

    #[abi(embed_v0)]
    impl FundRaisingImpl of super::IFundRaising<ContractState> {
        #[inline(always)]
        fn is_owner(self: @ContractState) -> bool {
            self.owner.read() == get_caller_address()
        }
        
        #[inline(always)]
        fn only_owner(self: @ContractState) {
            assert!(Self::is_owner(self), "Not owner");
        }

        fn deposit(ref self: ContractState, amount: felt252) {
            assert(amount != 0, 'Amount cannot be 0');
            self.balance.write(self.balance.read() + amount);
        }

        fn get_balance(self: @ContractState) -> felt252 {
            self.balance.read()
        }

    }
}
