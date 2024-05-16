// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract MyToken {
    string public name = "PESO";
    string public abbrv = 'P';
    uint public supply = 0;

    mapping(address => uint) public balances;

    function mint(address _address, uint _value) public {
        supply += _value;
        balances[_address] += _value;
    }

    function burn(address _address, uint _value) public {
        if(balances[_address] >= _value){
            supply -= _value;
            balances[_address] -= _value;
        }
    }
}
