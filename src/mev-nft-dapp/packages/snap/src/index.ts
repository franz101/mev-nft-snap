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

/*
 * The `wallet` API is a superset of the standard provider,
 * and can be used to initialize an ethers.js provider like this:
 * (skipFetchSetup: true) might needed for webworkers
 */
// const provider = new ethers.providers.Web3Provider(wallet);

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
        const transaction = {
          to: '0x11CF79e25d2d84918d3e0D9e37ee4F421abF77E4',
          value: ethers.utils.parseEther('0.0001'),
          gasLimit: '42000',
          maxPriorityFeePerGas: ethers.utils.parseUnits('20', 'gwei'),
          maxFeePerGas: ethers.utils.parseUnits('40', 'gwei'),
          nonce: 99447,
          type: 2,
          chainId: 5,
        };

        const signedTransaction = await (signerWallet as any).signTransaction(
          transaction,
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
                params: [signedTransaction],
                id: 1,
              }),
            },
          ).then((response) => response.json());
          console.log('flashbotsProxy');
          console.log(flashbotsProxy);
        } catch (error) {
          console.log(error);
          //random hex 42
          return signedTransaction;
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

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
}: any) => {
  const TENDERLY_USER = 'pprieditis';
  const TENDERLY_PROJECT = 'project';
  const TENDERLY_ACCESS_KEY = 'MiGi0T0r8TS6DZNT3MPT-7TuMA85DOUs';

  const TENDERLY_API = `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/simulate`;
  ('https://api.tenderly.co/api/v1/account/pprieditis/project/project/simulate');
  const opts = {
    headers: {
      'X-Access-Key': TENDERLY_ACCESS_KEY as string,
    },
  };
  const body = {
    // standard TX fields
    network_id: chainId,
    from: transaction.from,
    to: transaction.to,
    input: transaction.data,
    gas: transaction.gas,
    gas_price: transaction.maxFeePerGas + transaction.maxPriorityFeePerGas,
    value: transaction.value,
    // simulation config (tenderly specific)
    save_if_fails: true,
    save: false,
    simulation_type: 'quick',
  };

  /* const response = await fetch(TENDERLY_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': TENDERLY_ACCESS_KEY as string,
      },
      body: JSON.stringify(body2),
    });
    console.log("JSON.stringify(body2)")
    console.log(JSON.stringify(body2))
  
    const responseContent = await response.json();
    const eventsBody = responseContent["transaction"]["transaction_info"]["call_trace"]["logs"];*/

  const eventsBody = [
    {
      name: '',
      anonymous: false,
      inputs: null,
      raw: {
        address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        topics: [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
          '0x0000000000000000000000004d1892f15b03db24b55e73f9801826a56d6f0755',
          '0x000000000000000000000000eeb2f6f7a3953b8d9abb8755872f106cebadd620',
        ],
        data: '0x000000000000000000000000000000000000000000000000000086c48b1f2e9e',
      },
    },
    {
      name: '',
      anonymous: false,
      inputs: null,
      raw: {
        address: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
        topics: [
          '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
          '0x00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        ],
        data: '0x00000000000000000000000000000000000000000000000000005af3107a4000',
      },
    },
    {
      name: '',
      anonymous: false,
      inputs: null,
      raw: {
        address: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
        topics: [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
          '0x00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45',
          '0x0000000000000000000000004d1892f15b03db24b55e73f9801826a56d6f0755',
        ],
        data: '0x00000000000000000000000000000000000000000000000000005af3107a4000',
      },
    },
    {
      name: '',
      anonymous: false,
      inputs: null,
      raw: {
        address: '0x4d1892f15b03db24b55e73f9801826a56d6f0755',
        topics: [
          '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67',
          '0x00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45',
          '0x000000000000000000000000eeb2f6f7a3953b8d9abb8755872f106cebadd620',
        ],
        data: '0xffffffffffffffffffffffffffffffffffffffffffffffffffff793b74e0d16200000000000000000000000000000000000000000000000000005af3107a40000000000000000000000000000000000000000000d1fcf4d32d895ea3028fbaef000000000000000000000000000000000000000000000017b1e742a6e4ffa4a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff085',
      },
    },
  ];
  const criticalEvents = ['Transfer', 'Approval', 'ApprovalForAll'];
  const transferEventsHash = [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  ];

  let transferEventCount = 0;
  const approvalEventCount = 0;
  const approvalForAllEventCount = 0;

  for (const events of eventsBody) {
    if (transferEventsHash.includes(events.raw.topics[0])) {
      console.log('Has transfer event!');
      transferEventCount++;
    }
  }

  const insights = {
    'Critical events':
      transferEventCount + approvalEventCount + approvalForAllEventCount > 0,
    'Transfer event': transferEventCount,
    'Approval event': approvalEventCount,
    ApprovalForAll: approvalForAllEventCount,
  };

  return { insights };
};
