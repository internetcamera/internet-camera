// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IClaimableFilm {
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
    ) external;
}
