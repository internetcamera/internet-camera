// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IInternetCamera {
    function postPhoto(address filmAddress, string memory ipfsHash) external;

    function registerFilm(address filmAddress) external;

    function registerFilm(address filmAddress, address creatorAddress) external;

    function setFilmFactoryAddress(address filmFactoryAddress_) external;
}
