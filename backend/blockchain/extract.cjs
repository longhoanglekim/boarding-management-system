const fs = require("fs");

console.log("=== EXTRACT SCRIPT STARTED ===");

const artifact = require(
  "./artifacts/contracts/RentingContract.sol/RentingContract.json"
);

fs.writeFileSync(
  "./artifacts/RentingContract.abi",
  JSON.stringify(artifact.abi, null, 2)
);

fs.writeFileSync(
  "./artifacts/RentingContract.bin",
  artifact.bytecode.replace("0x", "")
);

console.log("=== EXTRACT SCRIPT FINISHED ===");
