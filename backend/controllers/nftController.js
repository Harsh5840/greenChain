const NFT = require("../models/NFT");
const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAbi = require("../abi/ProofOfGreenNFT.json");
const contractAddress = process.env.CONTRACT_ADDRESS;

const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);

const mintNFT = async (req, res) => {
  const { to, metadataURI } = req.body;

  if (!to || !metadataURI) {
    return res.status(400).json({ error: "Address and MetadataURI are required" });
  }

  try {
    const tx = await contract.mintGreenNFT(to, metadataURI);
    await tx.wait();

    const newNFT = new NFT({
      tokenId: tx.hash,
      owner: to,
      metadataURI: metadataURI
    });

    await newNFT.save();

    console.log("NFT minted and saved:", newNFT);

    res.json({ message: "NFT Minted Successfully", txHash: tx.hash });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { mintNFT };
