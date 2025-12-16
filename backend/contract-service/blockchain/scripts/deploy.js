import fs from "fs";
import path from "path";

export default async function main() {
  const Renting = await ethers.getContractFactory("RentingContract");
  const renting = await Renting.deploy();

  await renting.waitForDeployment();
  const address = await renting.getAddress();

  console.log("RentingContract deployed to:", address);

  // export ABI + address cho backend
  const artifact = await artifacts.readArtifact("RentingContract");

  const outDir = path.join("abi");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  fs.writeFileSync(
    path.join(outDir, "RentingContract.json"),
    JSON.stringify({ address, abi: artifact.abi }, null, 2)
  );
}
