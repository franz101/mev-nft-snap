import * as ethers from 'ethers';
import {
  OnTransactionHandler,
  OnRpcRequestHandler,
} from '@metamask/snap-types';
import { ethErrors } from 'eth-rpc-errors';
import { getPublicKey, sign } from '@noble/bls12-381';
import {
  deriveBIP44AddressKey,
  JsonBIP44CoinTypeNode,
} from '@metamask/key-tree';
import { bytesToHex } from '@metamask/utils';
import { FlashbotsBundleProvider } from '@flashbots/ethers-provider-bundle';

/*
 * The `wallet` API is a superset of the standard provider,
 * and can be used to initialize an ethers.js provider like this:
 */
const provider = new ethers.providers.Web3Provider(wallet);

const getCoinTypeNode = async (coinType: number) => {
  return (await wallet.request({
    method: 'snap_getBip44Entropy',
    params: { coinType },
  })) as JsonBIP44CoinTypeNode;
};

const convertCoinTypeNodeToPublicKey = async (
  coinTypeNode: JsonBIP44CoinTypeNode,
) => {
  const privateKey = await deriveBIP44AddressKey(coinTypeNode, {
    account: 0,
    change: 0,
    address_index: 0,
  });
  if (privateKey.privateKeyBuffer)
    return bytesToHex(privateKey.privateKeyBuffer) + '';
};

/**
 * Get a message from the origin. For demonstration purposes only.
 *
 * @param originString - The origin string.
 * @returns A message based on the origin.
 */
export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns `null` if the request succeeded.
 * @throws If the request method is not valid for this snap.
 * @throws If the `snap_confirm` call failed.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  console.log('onRpcRequest', request);
  const coinTypeNode = await getCoinTypeNode(60);
  const privateKey = await convertCoinTypeNodeToPublicKey(coinTypeNode);
  console.log(privateKey);
  switch (request.method) {
    case 'hello':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'Welcome to MEV NFT',
            description: 'Install transaction insights',
            textAreaContent:
              'When you confirm a transaction open the MEV NFT tab',
          },
        ],
      });
    case 'getAccount': {
      const params = request.params;
      if (privateKey) {
        return bytesToHex(getPublicKey(privateKey));
      } else {
        return 'Unknown';
      }
    }

    case 'signMessage': {
      if (privateKey) {
        const pubKey = getPublicKey(privateKey);
        const data = (request.params as string[])[0];
        if (!data || typeof data !== 'string') {
          throw ethErrors.rpc.invalidParams({
            message: `Invalid signature data: "${data}".`,
          });
        }

        const approved = await wallet.request({
          method: 'snap_confirm',
          params: [
            {
              prompt: 'BLS signature request',
              textAreaContent: `Do you want to BLS sign ${data} with ${bytesToHex(
                pubKey,
              )}?`,
            },
          ],
        });
        if (!approved) {
          throw ethErrors.provider.userRejectedRequest();
        }
        const newLocal = await sign(new TextEncoder().encode(data), privateKey);
        return bytesToHex(newLocal);
      } else {
        return 'Unknown';
      }
    }
    case 'sendRawTransactionFlash': {
      if (privateKey) {
        const signerWallet = new ethers.Wallet(privateKey);
        const transaction = (request.params as Record<string, any>[])[0];
        // sign the transaction for flashbots (not needed for the original tx)
        // const authSigner = new ethers.Wallet(
        //   '0x2000000000000000000000000000000000000000000000000000000000000000',
        //   provider,
        // );
        // console.log('tx1');
        // const blockNumber = await provider.getBlockNumber();
        // console.log('blockNumber');
        // console.log(blockNumber);
        // const flashbotsProvider = await FlashbotsBundleProvider.create(
        //   provider,
        //   authSigner,
        //   'https://relay-goerli.flashbots.net',
        //   'goerli',
        // );
        // console.log('tx1');
        // const signedTransactions = await flashbotsProvider.signBundle([
        //   {
        //     signer: signerWallet,
        //     transaction,
        //   },
        // ]);
        // console.log('tx1');
        const signedTransaction = await signerWallet.signTransaction(
          transaction,
        );
        const rawTransaction = await ethers.utils.serializeTransaction(
          transaction,
          signedTransaction,
        );
        try {
          const flashbotsProxy = await fetch(
            `https://rpc-goerli.flashbots.net`,
            {
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
            },
          ).then((response) => response.json());
          console.log('flashbotsProxy');
          console.log(flashbotsProxy);
        } catch (error) {
          console.log(error);
          //random hex 42
          return '0x382343a832290327d89dsh9dh98';
        }
      } else {
        return 'Missing private key';
      }
    }
    default:
      throw ethErrors.rpc.methodNotFound({
        data: { method: request.method },
      });
  }
};

// export const onTransaction: OnTransactionHandler = async ({
//   transaction,
//   chainId,
// }) => {
//   console.log(window)
//   const insights = {
//     'Transaction sender': transaction.from,
//     'Arbitrary name': "Hello I'm a string",
//     'Chain ID': chainId,
//   };
//   return { insights };
// };
