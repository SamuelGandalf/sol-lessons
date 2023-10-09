// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./Token.sol";

contract FlashLoan{
    Token public token;

    constructor (address _tokenAddress){
        token = Token(_tokenAddress);
    }

    //allows someone to deposit tokens into the pool
    function depositTokens(uint256 _amount) external{
        token.transferFrom(msg.sender, address(this), _amount);
    }

    
}