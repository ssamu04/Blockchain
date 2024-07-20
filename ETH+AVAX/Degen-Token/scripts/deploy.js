const hre = require("hardhat");

async function main() {
  // Get smart contract
  const Points = await hre.ethers.getContractFactory("degenToken");

  // Deploy it
  const points = await Points.deploy();
  await points.waitForDeployment();

  // Display the contract address
  console.log(`Degen Contract deployed to ${points.target}`);
}

// Hardhat recommends this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
