// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./film/BasicFilm.sol";
import "./film/ClaimableFilm.sol";
import "./interfaces/IInternetCamera.sol";
import "./utils/TrustedForwarderRecipient.sol";

/**
 * @dev The Internet Camera Film Registry allows creators of Internet Camera Film to deploy film easily (and pay fees upfront).
 */

contract InternetCameraFilmFactory is TrustedForwarderRecipient {
    // Storage
    address private _cameraAddress;

    // Deployment
    constructor(address cameraAddress_) TrustedForwarderRecipient() {
        _cameraAddress = cameraAddress_;
    }

    // Public APIs
    function deployPersonalFilm(
        string memory name,
        string memory symbol,
        string memory tokenURI,
        uint256 totalSupply,
        uint256 starts,
        uint256 expires
    ) public returns (address) {
        address filmAddress = address(
            new BasicFilm(
                name,
                symbol,
                tokenURI,
                totalSupply,
                starts,
                expires,
                _cameraAddress,
                _msgSender(),
                false
            )
        );
        _registerFilm(filmAddress);
        return filmAddress;
    }

    function deployClaimableFilm(
        string memory name,
        string memory symbol,
        string memory tokenURI,
        uint256 totalSupply,
        uint256 starts,
        uint256 expires,
        uint256 amountClaimablePerUser,
        uint256 maxClaimsPerUser
    ) public returns (address) {
        address filmAddress = address(
            new ClaimableFilm(
                name,
                symbol,
                tokenURI,
                totalSupply,
                starts,
                expires,
                _cameraAddress,
                _msgSender(),
                amountClaimablePerUser,
                maxClaimsPerUser
            )
        );
        _registerFilm(filmAddress);
        return filmAddress;
    }

    // Read APIs
    function cameraAddress() public view returns (address) {
        return _cameraAddress;
    }

    // Internal APIs
    function _registerFilm(address filmAddress) internal {
        IInternetCamera(_cameraAddress).registerFilm(filmAddress, _msgSender());
    }
}
