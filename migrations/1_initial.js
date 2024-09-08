const keys = artifacts.require("./DecryptedKeyStorage.sol");

module.exports = function(deployer){
    deployer.deploy(keys);
}