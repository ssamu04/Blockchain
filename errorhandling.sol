// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract ErrorHandling {

    function test(uint _val) public pure {
        require(_val > 5, "Input must be greater than 5");
        if (_val > 9) {
            revert("Input must be less than 10");
        }
        assert(_val == 7);
    }

}