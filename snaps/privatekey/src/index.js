/**
 * This example will use its app key as a signing key, and sign anything it is
 * asked to.
 */

const ethers = require("ethers");
const { JsonSLIP10Node, SLIP10Node } = require("@metamask/key-tree");
const { add0x, assert, bytesToHex } = require("@metamask/utils");
const { getPublicKey, sign } = require("@noble/bls12-381");
const {
  deriveBIP44AddressKey,
  JsonBIP44CoinTypeNode,
} = require("@metamask/key-tree");

/*
 * The `wallet` API is a superset of the standard provider,
 * and can be used to initialize an ethers.js provider like this:
 */
const provider = new ethers.providers.Web3Provider(wallet);

const getCoinTypeNode = async (params) => {
  return await wallet.request({
    method: "snap_getBip44Entropy",
    params,
  });
};

// const getPublicKey = async (params) => {
//   return await wallet.request({
//     method: "snap_getBip32PublicKey",
//     params,
//   });
// };

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param {object} args - The request handler args as object.
 * @param {JsonRpcRequest<unknown[] | Record<string, unknown>>} args.request - A
 * validated JSON-RPC request object.
 * @returns {unknown} The response, based on the request method.
 * @throws If the request method is not valid for this snap.
 */
module.exports.onRpcRequest = async ({ request }) => {
  console.log("received request", request);
  const coinTypeNode = await getCoinTypeNode({
    coinType: 60,
  });
  const privateKey = await deriveBIP44AddressKey(coinTypeNode, {
    account: 0,
    change: 0,
    address_index: 0,
  });
  const privKey = bytesToHex(privateKey.privateKeyBuffer) + "";
  console.log(`privKey is ${privKey}`);
  const ethWallet = new ethers.Wallet(privKey, provider);
  console.dir(ethWallet);
  switch (request.method) {
    case "address":
      return ethWallet.address;
    case "signMessage": {
      const message = request.params[0];
      console.log("trying to sign message", message);
      return ethWallet.signMessage(message);
    }
    case "sign": {
      const transaction = request.params[0];
      return ethWallet.sign(transaction);
    }
    default:
      throw new Error("Method not found.");
  }
};
