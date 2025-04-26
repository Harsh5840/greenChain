// routes/nftRoutes.js
const express = require("express");
const { getTotalSupply, mintNFT } = require("../controllers/nftController");

const router = express.Router();

router.get("/totalSupply", getTotalSupply);


router.post("/mint", mintNFT);

module.exports = router;
