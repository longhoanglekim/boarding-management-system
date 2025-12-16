async function main() {
    const RentingContract = await ethers.getContractFactory("RentingContract");
    const contract = await RentingContract.deploy();

    await contract.waitForDeployment();

    console.log("RentingContract deployed to:", await contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
