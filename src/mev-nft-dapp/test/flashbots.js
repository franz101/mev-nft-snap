const fetch = require('node-fetch');
const { ethers } = require('hardhat');
const { expect } = require('chai');
describe('Transaction', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  it('Send flashbots manually', async function () {
    let privatekey = process.env['PRIVATE_KEY'];
    let wallet = new ethers.Wallet(privatekey);
    console.log('Using wallet address ' + wallet.address);
    let transaction = {
      to: '0x11CF79e25d2d84918d3e0D9e37ee4F421abF77E4',
      value: ethers.utils.parseEther('0.0001'),
      gasLimit: '42000',
      maxPriorityFeePerGas: ethers.utils.parseUnits('20', 'gwei'),
      maxFeePerGas: ethers.utils.parseUnits('40', 'gwei'),
      nonce: Math.floor(Math.random() * 100000),
      type: 2,
      chainId: 5,
    };
    let rawTransaction = await wallet
      .signTransaction(transaction)
      .then(ethers.utils.serializeTransaction(transaction));
    console.log('Raw txhash string ' + rawTransaction);
    // send post request to rpc endpoint
    // then log it
    let gethProxy = await fetch(`https://rpc-goerli.flashbots.net`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_sendRawTransaction',
        params: [rawTransaction],
        id: 1,
      }),
    });
    let response = await gethProxy.json();
    // print the API response
    console.log(response);
    await expect(response.result[1]).to.be.eq('x');
  });
});
