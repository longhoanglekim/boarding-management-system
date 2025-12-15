pragma solidity ^0.8.30;

contract RentingContract {
    mapping(string => string) public contracts;

    event ContractStored(address indexed account, string contractId);
    event ContractSignedByRenter(address indexed account, string contractId);
    event ContractSignedByOwner(address indexed account, string contractId);
    function storeContract(
        string memory contractId,
        string memory contractHash
    ) public {
        contracts[contractId] = contractHash;
        emit ContractStored(msg.sender, contractId);
    }

    function getContract(string memory contractId) public view returns (string) {
        return contracts[contractId];
    }
}