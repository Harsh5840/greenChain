const { ethers } = require("ethers");

const getProvider = () => {
  return new ethers.JsonRpcProvider(process.env.INFURA_URL);
};

const getSigner = () => {
  const provider = getProvider();
  return new ethers.Wallet(process.env.PRIVATE_KEY, provider);
};

module.exports = { getProvider, getSigner };
