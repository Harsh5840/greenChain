// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProofOfGreenNFT is ERC721URIStorage, Ownable {
    uint256 public tokenIdCounter;

    constructor() ERC721("ProofOfGreenNFT", "POG") Ownable(msg.sender) {} // Pass initial owner to Ownable constructor

    function mintGreenNFT(address to, string memory metadataURI) public onlyOwner {
        uint256 newTokenId = tokenIdCounter;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, metadataURI);
        tokenIdCounter++;
    }
}
