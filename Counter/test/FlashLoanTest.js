const {ethers} = require("hardhat");
const {expect} = require("chai");

const tokens = (n) => {
    return ethers.parseUnits(n.toString(), "ether")
}
const ether = tokens
//let accounts
let transaction

describe("FlashLoan",  () =>{
    beforeEach( async () =>{
        //setting uop the accounts
        accounts = await ethers.getSigners()
        deployer = accounts[0]

        //deploy the contracts
        const FlashLoan = await ethers.getContractFactory("FlashLoan")
        const FlashLoanReceiver = await ethers.getContractFactory("FlashLoanReceiver")
        const Token = await ethers.getContractFactory("Token")

        //deploy the token, dapp university token, fake though
        token = await Token.deploy("Dapp University", "DAPP", "1000000")

        //deploy the flash loan pool
        flashLoan = await FlashLoan.deploy(token.getAddress())

        //approve the transaction
        transaction = await token.connect(deployer).approve(flashLoan.getAddress(), tokens(1000000))
        await transaction.wait()

         //allows someone to deposit tokens into the pool
        transaction = await flashLoan.connect(deployer).depositTokens(tokens(1000000))
        await transaction.wait()

    })

    describe("Deployment", () =>{
        it("Sends tokens to the flash loan contract", async ()=>{
            expect(await token.balanceOf(flashLoan.getAddress())).to.equal(tokens(1000000))
        })
    })
})