pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RealEstateNFT is ERC721, Ownable {
    uint256 public nextTokenId;

    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("RealEstateNFT", "REALESTATE") {}

    function mintProperty(address to, string memory tokenURI) public onlyOwner {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _tokenURIs[tokenId] = tokenURI;
        nextTokenId++;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }
}
