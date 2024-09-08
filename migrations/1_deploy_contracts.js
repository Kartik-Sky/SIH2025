const NumberStorage = artifacts.require("NumberStorage");

module.exports = function (deployer) {
  deployer.deploy(NumberStorage);
};
