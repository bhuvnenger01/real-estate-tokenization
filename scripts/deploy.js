const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();  // Get the wallet to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy your contract
  const Contract = await ethers.getContractFactory("YourContractName");
  const contract = await Contract.deploy();

  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
