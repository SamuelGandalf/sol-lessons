// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./Token.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract FlashLoan{
    using SafeMath for uint256;

    Token public token;
    uint256 public poolBalance;

    constructor (address _tokenAddress){
        token = Token(_tokenAddress);
    }

   
    function depositTokens(uint256 _amount) external{
        require (_amount > 0, "Cannot deposit Zero tokens, at least one! ");
        token.transferFrom(msg.sender, address(this), _amount);
        poolBalance = poolBalance.add(_amount);
    }

    
}