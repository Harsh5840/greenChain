// server.js
const express = require("express");
const dotenv = require("dotenv");
const { ethers } = require("ethers");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Basic endpoint to check server is working
app.get("/", (req, res) => {
  res.send("Backend server is up and running!");
});

// Ethereum Connection (using ethers.js)
const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);

// Sample route to interact with the deployed smart contract
app.get("/getTotalSupply", async (req, res) => {
  const contractAddress = process.env.CONTRACT_ADDRESS;   //
  const abi = [
    "function totalSupply() view returns (uint256)"
  ];

  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    const totalSupply = await contract.totalSupply();
    res.json({ totalSupply: totalSupply.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
