// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DecryptedKeyStorage {
    // Mapping to store the decrypted key by an ID
    mapping(uint => string) public decryptedKeys;

    function addDecryptedKey(uint index, string memory key) public {
        decryptedKeys[index] = key;
    }

    function getDecryptedKey(uint index) public view returns (string memory) {
        return decryptedKeys[index];
    }
}
