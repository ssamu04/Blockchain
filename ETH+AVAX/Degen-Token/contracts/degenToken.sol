// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract degenToken is ERC20, Ownable {
    mapping(string => uint256) public itemCost;
    mapping(address => string[]) public playerInventory;

    constructor() ERC20("Degen", "DGN") Ownable(msg.sender) {
        itemCost["Gun"] = 20;
        itemCost["Armor"] = 15;
        itemCost["Grenade"] = 5;
    }

    function mint(uint256 amount) external onlyOwner {
        _mint(msg.sender, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function transferToken(address destination, uint256 amount) public {
        _transfer(msg.sender, destination, amount);
    }

    function checkBalance() public view returns (uint256) {
        return balanceOf(msg.sender);
    }

    function redeemItem(string memory item) external  {
        uint256 cost = itemCost[item];
        require(cost > 0, "Invalid item");
        _burn(msg.sender, cost);
        playerInventory[msg.sender].push(item);
    }

    function viewInventory() public view returns (string[] memory) {
        return playerInventory[msg.sender];
    }
}

