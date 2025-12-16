const { expect } = require("chai");

describe("RentingContract", function () {
    it("should create room", async function () {
        const Contract = await ethers.getContractFactory("RentingContract");
        const contract = await Contract.deploy();

        await contract.createRoom(1000);

        const room = await contract.rooms(1);
        expect(room.price).to.equal(1000);
        expect(room.available).to.equal(true);
    });
});
