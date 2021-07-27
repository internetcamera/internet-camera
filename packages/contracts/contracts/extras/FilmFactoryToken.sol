// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FilmFactoryToken is ERC20, ERC20Burnable, Ownable {
    // Storage
    address private _filmFactoryAddress;

    // Deployment
    constructor() ERC20("Film Factory Token", "FILMFACTORY") {}

    // Owner mint function
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
        _approve(
            to,
            _filmFactoryAddress,
            allowance(to, _filmFactoryAddress) + amount
        );
    }

    function setFilmFactoryAddress(address filmFactoryAddress_)
        public
        onlyOwner
    {
        _filmFactoryAddress = filmFactoryAddress_;
    }
}
