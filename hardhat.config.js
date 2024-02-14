require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      gas: "auto",
      chainId: 1,
      forking: {
        url: "http://127.0.0.1:6545",
      },
    },
  },
};
