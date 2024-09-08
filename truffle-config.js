module.exports = {
  networks: {
    development: {
      host: "192.168.142.156",
      port: 7545,
      network_id: "*",
    },
  },

  compilers: {
    solc: {
      version: "0.8.0",  // Specify the Solidity version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
        // Remove the evmVersion option to use the default
      }
    }
  }
};
