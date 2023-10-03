const {ethers} = require("hardhat");
const {expect} = require("chai");

const tokens = (n) => {
    return ethers.parseUnits(n.toString(), "ether")
}
const ether = tokens
describe("Real Estate", () => {
    // depoly the contracts
    let realEstate, escrow
    let deployer, seller
    let nftID = 1
    let purchasePrice = ether(100)
    let escrowAmount = ether(20)
    beforeEach( async  () => {
        //set up accounts
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        seller = deployer
        buyer = accounts[1]
        inspector = accounts[2]
        lender = accounts[3]
        // this gets / fetches the contract
        const RealEstate = await ethers.getContractFactory("RealEstate")
        const Escrow = await ethers.getContractFactory("Escrow")
        //deploy the contracts
        realEstate = await RealEstate.deploy()
        escrow = await Escrow.deploy( 
            realEstate.getAddress(),
            nftID,
            purchasePrice,
            escrowAmount,
            seller.getAddress(),
            buyer.getAddress(),
            inspector.getAddress(),
            lender.getAddress()
        )
            //seller approves the nft sale
        transaction = await realEstate.connect(seller).approve(escrow.getAddress(), nftID)
        await transaction.wait()
    })

    describe("Deployoyment", async () => {
        it("Sends an NFT to the seller / deployer", async () =>{
            expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)

        })
    })

    describe("Selling Real Estate", async () => {
        let transaction, balance
        it("Executes a successful transaction", async () =>{
            //makes sure that the seller is the nft owner berfore the sel
            expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)

            //escrow balance before buyer deposits earnest
            balance = await escrow.getBalance()
            console.log("escrow balance before earnest: ", ethers.formatEther(balance))

            //the buyer deposits earnest
            transaction = await escrow.connect(buyer).depositEarnest({value: ether(20)})
            
            //check the escrow balance after buyer deposites earnest
            balance = await escrow.getBalance()
            console.log("the escrow balance: ", ethers.formatEther(balance))

            //Inspector status
            transaction = await escrow.connect(inspector).updateInspectionStatus(true)
            await transaction.wait()
            console.log("Inspector updates status!")

            //Approve the transaction
            transaction = await escrow.connect(buyer).approveSale()
            await transaction.wait()
            console.log("the buyer approves the sale")

            transaction = await escrow.connect(seller).approveSale()
            await transaction.wait()
            console.log("the seller approves the sale")

            transaction = await escrow.connect(lender).approveSale()
            await transaction.wait()
            console.log(" the lender approves the transaction")

            //Finalise the transaction
            transaction = await escrow.connect(buyer).finalseSale()
            await transaction.wait()
            console.log("Buyer finalised the sale")

            expect(await realEstate.ownerOf(nftID)).to.equal(buyer.address)

        })
    })
})