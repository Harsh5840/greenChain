
const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  tokenId: { type: String, required: true },
  owner: { type: String, required: true },
  metadataURI: { type: String, required: true },
  mintedAt: { type: Date, default: Date.now },
});

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;
