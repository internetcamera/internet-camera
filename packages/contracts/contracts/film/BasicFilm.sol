// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "../interfaces/IInternetCameraFilm.sol";
import "../interfaces/IBasicFilm.sol";
import "../utils/TrustedForwarderRecipient.sol";

/**
 * @dev Generic but complete contract for the Internet Camera Film standard.
 */

contract BasicFilm is
    ERC20Upgradeable,
    IInternetCameraFilm,
    IBasicFilm,
    TrustedForwarderRecipient
{
    uint256 internal _starts;
    uint256 internal _expires;
    string internal _tokenURI;
    address internal _cameraAddress;

    constructor(address forwarderAddress_)
        TrustedForwarderRecipient(forwarderAddress_)
    {}

    /**
     * @dev Initialize Film.
     */
    function initialize(
        string memory name,
        string memory symbol,
        string memory tokenURI_,
        uint256 totalSupply,
        uint256 starts_,
        uint256 expires_,
        address cameraAddress_,
        address creatorAddress_
    ) public override initializer {
        __ERC20_init(name, symbol);
        _starts = starts_;
        _expires = expires_;
        _tokenURI = tokenURI_;
        _cameraAddress = cameraAddress_;
        _mint(creatorAddress_, totalSupply);
    }

    // Standard public APIs
    function startTime() public view virtual override returns (uint256) {
        return _starts;
    }

    function expireTime() public view virtual override returns (uint256) {
        return _expires;
    }

    function tokenURI() public view override returns (string memory) {
        return string(abi.encodePacked("ipfs://", _tokenURI));
    }

    function cameraAddress() public view override returns (address) {
        return _cameraAddress;
    }

    /**
     * @dev Approve one Film to be deposited into the Internet Camera.
     */
    function loadFilm(address account) public override {
        require(
            _msgSender() == _cameraAddress,
            "InternetCameraFilm: depositFilm must be called from Camera."
        );
        require(
            block.timestamp >= _starts,
            "InternetCameraFilm: This film cannot be used yet."
        );
        require(
            block.timestamp < _expires,
            "InternetCameraFilm: This film has expired."
        );
        _approve(account, _cameraAddress, 1 * 10**18);
    }

    function _msgSender()
        internal
        view
        override(ContextUpgradeable, TrustedForwarderRecipient)
        returns (address)
    {
        return TrustedForwarderRecipient._msgSender();
    }

    function _msgData()
        internal
        view
        override(ContextUpgradeable, TrustedForwarderRecipient)
        returns (bytes memory ret)
    {
        return TrustedForwarderRecipient._msgData();
    }
}
