/// Interface representing `HelloContract`.
/// This interface allows modification and retrieval of the contract balance.
use core::starknet::ContractAddress;

#[starknet::interface]
pub trait IFundRaising<TContractState> {
    /// Checks if the caller is an owner
    fn is_owner(self: @TContractState) -> bool; // todo
    fn only_owner(self: @TContractState);
    /// Increase contract balance.
    fn deposit(ref self: TContractState, amount: u256);
    /// Decrease contract balance.
    fn withdraw(ref self: TContractState, amount: u256); // todo
    /// Retrieve contract balance.
    fn get_balance(self: @TContractState) -> u256;
    /// Retrive the owner wallet address
    fn get_owner_address(self: @TContractState) -> ContractAddress; // todo
}

/// Simple contract for managing balance.
#[starknet::contract]
mod FundRaising {
    use openzeppelin_token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use core::starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::{ContractAddress, contract_address_const};
    use starknet::{get_caller_address, get_contract_address};

    const ETH_CONTRACT_ADDRESS: felt252 =
        0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7;

    #[storage]
    struct Storage {
        owner: ContractAddress,
        balance: u256,
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

        fn deposit(ref self: ContractState, amount: u256) {
            assert(amount != 0, 'Amount cannot be 0');
            self.balance.write(self.balance.read() + amount);
            let eth_contract_address = contract_address_const::<ETH_CONTRACT_ADDRESS>();
            let eth_dispatcher = IERC20Dispatcher { contract_address: eth_contract_address };
            eth_dispatcher.transfer_from(get_caller_address(), get_contract_address(), amount);
        }

        fn withdraw(ref self: ContractState, amount: u256) {
            self.only_owner();
            assert!(self.balance.read() >= amount, "Insufficient funds");
            self.balance.write(self.balance.read() - amount);
            let eth_contract_address = contract_address_const::<ETH_CONTRACT_ADDRESS>();
            let eth_dispatcher = IERC20Dispatcher { contract_address: eth_contract_address };
            let balance = eth_dispatcher.balance_of(get_contract_address());
            eth_dispatcher.transfer(self.owner.read(), balance);
        }

        fn get_balance(self: @ContractState) -> u256 {
            self.balance.read()
        }
        
        fn get_owner_address(self: @ContractState) -> ContractAddress {
            self.owner.read()
        }
    }
}
