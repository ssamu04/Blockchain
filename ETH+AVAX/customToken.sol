// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/access/Ownable.sol";

// string public constant owner = "0xOwnerAddress";
// require(msg.sender == owner, "Only the owner can mint tokens");

contract CustomToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Falcoin", "FLC") {
        // 1 token = 1 * (10 ** decimals)
        initialSupply = initialSupply * 1 * 10**uint(decimals());
        _mint(msg.sender, initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 3;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
