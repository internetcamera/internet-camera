// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BasicFilm.sol";
import "../interfaces/IClaimableFilm.sol";

contract ClaimableFilm is BasicFilm, IClaimableFilm {
    // Storage
    uint256 private _amountClaimablePerUser;
    uint256 private _maxClaimsPerUser;
    mapping(address => uint256) private _claimCount;

    constructor(address forwarderAddress_) BasicFilm(forwarderAddress_) {}

    // Deployment
    function initialize(
        string memory name,
        string memory symbol,
        string memory tokenURI,
        uint256 totalSupply,
        uint256 starts,
        uint256 expires,
        address cameraAddress,
        uint256 amountClaimablePerUser_,
        uint256 maxClaimsPerUser_
    ) public override initializer {
        require(
            maxClaimsPerUser_ > 0,
            "ClaimableFilm: maxClaims must be greater than zero."
        );
        __ERC20_init(name, symbol);
        _starts = starts;
        _expires = expires;
        _tokenURI = tokenURI;
        _cameraAddress = cameraAddress;
        _amountClaimablePerUser = amountClaimablePerUser_;
        _maxClaimsPerUser = maxClaimsPerUser_;
        _mint(address(this), totalSupply);
    }

    // Public APIs
    function claimFilm() public {
        require(
            balanceOf(_msgSender()) < 1 * 10**decimals(),
            "ClaimableFilm: You already have some film."
        );
        require(
            _claimCount[_msgSender()] < _maxClaimsPerUser,
            "ClaimableFilm: You've already claimed all the film available to you."
        );
        _claimCount[_msgSender()]++;
        _transfer(address(this), _msgSender(), _amountClaimablePerUser);
    }

    function claimCountOf(address account) public view returns (uint256) {
        return _claimCount[account];
    }

    function amountClaimablePerUser() public view returns (uint256) {
        return _amountClaimablePerUser;
    }

    function maxClaimsPerUser() public view returns (uint256) {
        return _maxClaimsPerUser;
    }
}
