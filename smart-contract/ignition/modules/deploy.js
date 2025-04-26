async function main() {
    const ProofOfGreenNFT = await ethers.getContractFactory("ProofOfGreenNFT");
    const pogNFT = await ProofOfGreenNFT.deploy();
    await pogNFT.deployed();
  
    console.log(`ProofOfGreenNFT deployed at: ${pogNFT.address}`);
}
  
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
