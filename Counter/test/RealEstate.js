const {ethers} = require("hardhat");
const {expect} = require("chai");

describe("Real Estate", () => {
    // depoly the contracts
    let realEstate, escrow
    let deployer, seller
    let nftID = 1
    beforeEach( async  () => {
        //set up accounts
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        seller = deployer
        buyer = accounts[1]
        // this gets / fetches the contract
        const RealEstate = await ethers.getContractFactory("RealEstate")
        const Escrow = await ethers.getContractFactory("Escrow")
        //deploy the contracts
        realEstate = await RealEstate.deploy()
        escrow = await Escrow.deploy( 
            realEstate.address,
            nftID,
            seller.address,
            buyer.address
        )

        transaction = await realEstate.connect(seller).approve(escrow, nftID)
        await transaction.await()
    })

    describe("Deployoyment", async () => {
        it("Sends an NFT to the seller / deployer", async () =>{
            expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)

        })
    })

    describe("Selling Real Estate", async () => {
        it("executes a successful transaction", async () =>{
            //makes sure that the seller is the nft owner berfore the sel
            expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)

            transaction = await escrow.connect(buyer).finalseSale()
            await transaction.await()
            console.log("Buyer finalised the sale")

            expect(await realEstate.ownerOf(nftID)).to.equal(buyer.address)

        })
    })
})