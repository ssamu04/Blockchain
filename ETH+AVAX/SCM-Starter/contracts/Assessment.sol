// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;
    bool public frozen;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event FreezeStatusChanged(bool frozen);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        frozen = false;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function getAccountBalance() public view returns (uint256) {
        return msg.sender.balance / 1e18; //divide by 1e18 to get ETH
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");
        require(!frozen, "Contract is frozen");

        // perform transaction
        balance += _amount;
        
        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(!frozen, "Contract is frozen");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }

    function toggleFreeze() public {
        require(msg.sender == owner, "You are not the owner of this account");
        frozen = !frozen;
        emit FreezeStatusChanged(frozen);
    }
}
