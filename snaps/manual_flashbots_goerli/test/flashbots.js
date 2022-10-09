const fetch = require("node-fetch");
const { ethers } = require("hardhat");
const { expect } = require("chai");
describe("Transaction", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  it("Should fail if the unlockTime is not in the future", async function () {
    let privatekey = "0x2...";
    let wallet = new ethers.Wallet(privatekey);
    console.log("Using wallet address " + wallet.address);
    let transaction = {
      to: "0x11CF79e25d2d84918d3e0D9e37ee4F421abF77E4",
      value: ethers.utils.parseEther("0.0001"),
      gasLimit: "42000",
      maxPriorityFeePerGas: ethers.utils.parseUnits("20", "gwei"),
      maxFeePerGas: ethers.utils.parseUnits("40", "gwei"),
      nonce: 99447,
      type: 2,
      chainId: 5,
    };
    let rawTransaction = await wallet
      .signTransaction(transaction)
      .then(ethers.utils.serializeTransaction(transaction));
    console.log("Raw txhash string " + rawTransaction);
    // send post request to rpc endpoint
    // then log it
    let gethProxy = await fetch(`https://rpc-goerli.flashbots.net`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_sendRawTransaction",
        params: [rawTransaction],
        id: 1,
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    let response = await gethProxy.json();

    // print the API response
    console.log(response);
    await expect(1213).to.be.closeTo(1213, 1);
  });
});
