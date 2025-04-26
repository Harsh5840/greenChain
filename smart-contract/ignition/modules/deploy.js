import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ProofOfGreenNFTModule = buildModule("ProofOfGreenNFTModule", (m) => {
  const pogNFT = m.contract("ProofOfGreenNFT", []);
  return { pogNFT };
});

export default ProofOfGreenNFTModule;
