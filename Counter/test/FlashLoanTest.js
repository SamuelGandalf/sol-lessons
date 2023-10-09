const {ethers} = require("hardhat");
const {expect} = require("chai");

const tokens = (n) => {
    return ethers.parseUnits(n.toString(), "ether")
}
const ether = tokens
//let accounts

describe("FlashLoan",  () =>{
    beforeEach( async () =>{
        //setting uop the accounts
        accounts = await ethers.getSigners()
        deployer = accounts[0]

        //deploy the contracts
        const FlashLoan = await ethers.getContractFactory("FlashLoan")
        const FlashLoanReceiver = await ethers.getContractFactory("FlashLoanReceiver")
        const Token = await ethers.getContractFactory("Token")

        token = await Token.deploy("Dapp University", "DAPP", "1000000")

    })

    describe("Deployment", () =>{
        it("Goood! works", ()=>{
            expect(2+2).to.equal(4)
        })
    })
})