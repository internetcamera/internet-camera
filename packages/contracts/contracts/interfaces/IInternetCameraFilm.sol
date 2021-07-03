// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IInternetCameraFilm {
    function loadFilm(address) external;

    function tokenURI() external view returns (string memory);

    function startTime() external view returns (uint256);

    function expireTime() external view returns (uint256);

    function cameraAddress() external view returns (address);
}
