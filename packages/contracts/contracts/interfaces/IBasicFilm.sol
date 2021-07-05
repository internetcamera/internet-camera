// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IBasicFilm {
    function initialize(
        string memory name,
        string memory symbol,
        string memory tokenURI_,
        uint256 totalSupply,
        uint256 starts_,
        uint256 expires_,
        address cameraAddress_,
        address creatorAddress_
    ) external;
}
