const {ethers} = require ("hardhat");
const {expect} = require ("chai");

//const provider = ethers.providers.JsonRpcProviders();
describe("Counter",  () => {
    let counter
    beforeEach( async () => {
        const Counter = await ethers.getContractFactory("Counter")
        counter = await Counter.deploy("My Counter", 1)
    })

    describe("Deployment", () => {
        it("Sets the Initial count", async () => {
            //const count = await counter.count()
            expect(await counter.count()).to.equal(1)
        })
    
        it("Sets the Initial name", async () => {
            //const name = await counter.name()
            expect(await counter.name()).to.equal("My Counter")
        })

    })
    describe("Counting", () =>{
        let transaction
        it("reads from the 'count' public variable", async () => {
            expect(await counter.count()).to.equal(1)
        })
        it("reads from the 'getCount()' function", async () =>{
        expect(await counter.getCount()).to.equal(1)
    })
        it("increments the count", async () => {
            transaction = await counter.increment()
            await transaction.wait()
            //count = increment.count() 
            expect(await counter.count()).to.equal(2)

        })
        it("decrements the count", async () => {
            transaction = await counter.decrement()
            await transaction.wait()
            expect(await counter.count()).to.equal(0)
            //handles the error. makes sure the count doesnt decrement below 0
            await expect(counter.decrement()).to.be.reverted

        })

        it("reads the name from 'name' public variable", async () => {
            expect(await counter.name()).to.equal("My Counter")
        })
        it("reads from the 'getName()' function", async () => {
            expect(await counter.getName()).to.equal("My Counter")
        })
        it("updates the name", async () => {
            transaction = await counter.setName("New Counter Name")
            await transaction.wait()
            expect(await counter.name()).to.equal("New Counter Name")
        })
        
    })
   
})