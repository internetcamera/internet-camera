// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IInternetCamera.sol";
import "./interfaces/IInternetCameraFilm.sol";
import "./utils/TrustedForwarderRecipient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract InternetCamera is
    IInternetCamera,
    ERC721Enumerable,
    ERC721Burnable,
    Ownable,
    TrustedForwarderRecipient
{
    using Counters for Counters.Counter;

    // Storage
    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256) private _filmCounts;
    address private _filmFactoryAddress;

    // Events
    event PhotoPosted(
        address indexed creatorAddress,
        address indexed filmAddress,
        uint256 filmIndex,
        uint256 photoIndex
    );
    event FilmRegistered(
        address indexed creatorAddress,
        address indexed filmAddress
    );

    // Deployment
    constructor(address forwarderAddress_)
        ERC721("Internet Camera", "PHOTO")
        TrustedForwarderRecipient(forwarderAddress_)
    {}

    // Public APIs
    function postPhoto(address filmAddress, string memory ipfsHash)
        public
        override
    {
        // Withdraw 1 FILM from user's wallet
        IInternetCameraFilm(filmAddress).loadFilm(_msgSender());
        IERC20(filmAddress).transferFrom(
            _msgSender(),
            address(this),
            1 * 10**18
        );

        // Mint NFT and set token's metadata JSON to the ipfs hash sent
        _mint(_msgSender(), _tokenIdCounter.current());
        _tokenURIs[_tokenIdCounter.current()] = ipfsHash;

        emit PhotoPosted(
            _msgSender(),
            filmAddress,
            _filmCounts[filmAddress],
            _tokenIdCounter.current()
        );

        _tokenIdCounter.increment();
        _filmCounts[filmAddress]++;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return string(abi.encodePacked("ipfs://", _tokenURIs[tokenId]));
    }

    function registerFilm(address filmAddress) public override {
        require(
            IInternetCameraFilm(filmAddress).cameraAddress() == address(this),
            "This film is not registered to use this Internet Camera."
        );

        emit FilmRegistered(_msgSender(), filmAddress);
    }

    function registerFilm(address filmAddress, address creatorAddress)
        public
        override
    {
        require(
            _msgSender() == _filmFactoryAddress,
            "InternetCamera: This can only be called from the associated Film Factory."
        );
        require(
            IInternetCameraFilm(filmAddress).cameraAddress() == address(this),
            "This film is not registered to use this Internet Camera."
        );

        emit FilmRegistered(creatorAddress, filmAddress);
    }

    // Owner only APIs
    function setFilmFactoryAddress(address filmFactoryAddress_)
        public
        override
        onlyOwner
    {
        _filmFactoryAddress = filmFactoryAddress_;
    }

    // Overrides
    function _msgSender()
        internal
        view
        override(Context, TrustedForwarderRecipient)
        returns (address)
    {
        return TrustedForwarderRecipient._msgSender();
    }

    function _msgData()
        internal
        view
        override(Context, TrustedForwarderRecipient)
        returns (bytes memory ret)
    {
        return TrustedForwarderRecipient._msgData();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        return super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
