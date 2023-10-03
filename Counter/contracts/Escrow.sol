// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IERC721{
    function transferFrom(address _from, address _to, uint256 _id) external;
}

contract Escrow{
    address public nftAddress;
    uint256 public nftID;
    uint256 public purchasePrice;
    uint256 public escrowAmount;
    address payable public seller;
    address payable public buyer;
    address public inspector;
    address public lender;

    constructor(
     address _nftAddress,
     uint256 _nftID, 
     uint256 _purchasePrice,
     uint256 _escrowAmount,
     address payable _seller,
     address payable _buyer,
     address _inspector,
     address _lender
     )
     {
        nftAddress = _nftAddress;
        nftID = _nftID;
        purchasePrice = _purchasePrice;
        escrowAmount =_escrowAmount;
        seller = _seller;
        buyer = _buyer;
        inspector = _inspector;
        lender = _lender;
    }
    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only Buyer can call this function");

        _;
    }

    function depositEarnest() public payable onlyBuyer {
        require(msg.value >= escrowAmount);
        
        
    }
    function getBalance()  public view returns(uint){
        return address(this).balance;
    }

    function finalseSale() public{
        IERC721(nftAddress).transferFrom(seller, buyer, nftID);
    }

}

