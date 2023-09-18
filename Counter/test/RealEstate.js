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
        // this gets / fetches the contract
        const RealEstate = await ethers.getContractFactory("RealEstate")
        const Escrow = await ethers.getContractFactory("Escrow")
        //deploy the contracts
        realEstate = await RealEstate.deploy()
        escrow = await Escrow.deploy()
    })

    describe("Deployoyment", async () => {
        it("Sends an NFT to the seller / deployer", async () =>{
            expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)

        })
    })
})