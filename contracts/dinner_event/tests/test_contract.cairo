// use snforge_std::{ContractClassTrait, DeclareResultTrait, declare};
// use starknet::{ContractAddress};
// use dinner_event::IDinnerEventDispatcher;
// use dinner_event::IDinnerEventDispatcherTrait;

// fn deploy_contract(name: ByteArray) -> ContractAddress {
//     let contract = declare(name).unwrap().contract_class();
//     let (contract_address, _) = contract.deploy(@ArrayTrait::new()).unwrap();
//     contract_address
// }

// #[test]
// fn test_deploy() {
//     let contract_address = deploy_contract("DinnerEvent");

//     let dispatcher = IDinnerEventDispatcher { contract_address };
//     let host = dispatcher.get_host();
//     print!("{:?}", host);
// }


// #[test]
// fn test_join_guest_list() {
//     let contract_address = deploy_contract("DinnerEvent");

//     let dispatcher = IDinnerEventDispatcher { contract_address };
//     let guests_before = dispatcher.get_guests_number();
//     assert(guests_before == 0, 'Invalid number of guests');

//     dispatcher.join_guest_list(10);

//     let guests_after = dispatcher.get_guests_number();
//     assert(guests_after == 1, 'Invalid number of guests');
// }

// #[test]
// fn test_cancel_reservation() {
//     let contract_address = deploy_contract("DinnerEvent");

//     let dispatcher = IDinnerEventDispatcher { contract_address };
//     dispatcher.join_guest_list(10);

//     let guests_before = dispatcher.get_guests_number();
//     assert(guests_before == 1, 'Invalid number of guests');

//     dispatcher.cancel_reservation();

//     let guests_after = dispatcher.get_guests_number();
//     assert(guests_after == 0, 'Invalid number of guests');
// }