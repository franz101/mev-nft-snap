import {
  OnTransactionHandler,
  OnRpcRequestHandler,
} from '@metamask/snap-types';
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
const ethers = require('ethers');

const provider = new ethers.providers.Web3Provider(wallet);

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  console.log('received request', request);
  const privKey = await wallet.request({
    method: 'snap_getAppKey',
  });
  console.log(`privKey is ${privKey}`);
  const ethWallet = new ethers.Wallet(privKey, provider);
  console.dir(ethWallet);
  // 0xEEB2F6f7A3953B8d9aBB8755872F106CEbadd620

  // ethWallet.address
  // 0x41b94fD88Be6A9fe210aAc2eB78b0382468f607B
  // privKey
  // b30cc87807dbf8e2c263fbff9e1ba444d50919aae3d67358de33854d2923ec20

  switch (request.method) {
    case 'hello':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: getMessage(origin),
            description:
              'This custom confirmation is just for display purposes.',
            textAreaContent: privKey,
            // 'But you can edit the snap source code to make it do something, if you want to!',
          },
        ],
      });
    // case 'address':
    //    return ethWallet.address;
    default:
      throw new Error('Method not found.');
  }
};

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
}: any) => {
  // const TENDERLY_USER = 'pprieditis';
  // const TENDERLY_PROJECT = 'project';
  // const TENDERLY_ACCESS_KEY = 'MiGi0T0r8TS6DZNT3MPT-7TuMA85DOUs';
  const TENDERLY_USER = 'dxdao';
  const TENDERLY_PROJECT = 'dxdao-proposal-simulation';
  const TENDERLY_ACCESS_KEY = 'fbzJG0PD3R8sX5i2vCCqh4r3YyrELtIO';

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

  /* const body2 = `{
      "network_id": 5,
      "from": `+transaction.from+`,
      "to": `+transaction.to+`,
      "input": `+transaction.data+`,
      "gas": `+parseInt(transaction.gas)+`,
      "gas_price": `+parseInt(transaction.maxFeePerGas)+`,
      "value": `+parseInt(transaction.value)+`,
      "save_if_fails": true,
      "save": false,
      "simulation_type": "quick"
      }`;*/
  /* const body2 = `{
      "network_id": 5,
      "from": `+transaction.from+`,
      "to": `+transaction.to+`,
      "input": `+transaction.data+`,
      }`;*/
  const body2 = {
    network_id: 5,
    from: transaction.from,
    to: transaction.to,
    input: transaction.data,

    gas: parseInt(transaction.gas),
    gas_price: parseInt(transaction.maxFeePerGas),
    value: parseInt(transaction.value),
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
  // const criticalEvents = ["Transfer", "Approval", "ApprovalForAll"];
  // w3.sha3(text='Transfer(address,address,uint256)').hex() == 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
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

  /* const insights = {
      'response': responseContent,
      'Chain ID': chainId,
      'from': transaction.from,
      'to': transaction.to,
      'nonce': transaction.nonce,
      'value': transaction.value,
      'data': transaction.data,
      'gas': transaction.gas,
      'maxFeePerGas': transaction.maxFeePerGas,
      'maxPriorityFeePerGas': transaction.maxPriorityFeePerGas,
      'type': transaction.type,
      'estimateSuggested': transaction.estimateSuggested,
      'estimateUsed': transaction.estimateUsed,
    };*/
  return { insights };
  /*
    const TENDERLY_USER = 'dxdao';
    const TENDERLY_PROJECT = 'dxdao-proposal-simulation';
    const TENDERLY_ACCESS_KEY = 'fbzJG0PD3R8sX5i2vCCqh4r3YyrELtIO';
  
    let r = await fetch('https://api.tenderly.co/api/v1/account/dxdao/project/dxdao-proposal-simulation/simulate', {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-access-key": "fbzJG0PD3R8sX5i2vCCqh4r3YyrELtIO"
          },
          body: JSON.stringify({ 
            network_id: 5,
            from: "0xeeb2f6f7a3953b8d9abb8755872f106cebadd620",
            to: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            input: "0x5ae401dc000000000000000000000000000000000000000000000000000000006341151c00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000e404e45aaf000000000000000000000000b4fbf271143f4fbf7b91a5ded31805e42b2208d600000000000000000000000007865c6e87b9f70255377e024ace6630c1eaa37f0000000000000000000000000000000000000000000000000000000000000bb8000000000000000000000000eeb2f6f7a3953b8d9abb8755872f106cebadd62000000000000000000000000000000000000000000000000000005af3107a40000000000000000000000000000000000000000000000000000000000000250d54000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        }),
        })
    console.log(await r.json())
    */
};
