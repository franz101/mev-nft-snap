/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param {object} args - The request handler args as object.
 * @param {string} args.origin - The origin of the request, e.g., the website
 * that invoked the snap.
 * @param {JsonRpcRequest<unknown[] | Record<string, unknown>>} args.request - A
 * validated JSON-RPC request object.
 * @returns {boolean} `null` if the request succeeded.
 * @throws If the request method is not valid for this snap.
 * @throws If the `snap_notify` call failed.
 */


//https://github.com/Montoya/gas-fee-snap/blob/main/packages/snap/src/index.ts

module.exports.onRpcRequest = async ({ origin, request }) => {
  console.log('onRpcRequest');
  console.log(JSON.stringify(request,null,2))
  console.log(JSON.stringify(orign,null,2))
  switch (request.method) {
    case 'inApp':
      return wallet.request({
        method: 'snap_notify',
        params: [
          {
            type: 'inApp',
            message: `Hello, ${origin}!`,
          },
        ],
      });
    case 'native':
      return wallet.request({
        method: 'snap_notify',
        params: [
          {
            type: 'native',
            message: `Hello, ${origin}!`,
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};




module.exports.onTransaction = async ({transaction}) => {

  console.log(JSON.stringify(window.wallet,null,2))
  async 
  const todos = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  console.log("todos")
  console.log(JSON.stringify(todos,null,2))
  console.log("transaction")
  console.log(JSON.stringify(transaction,null,2))
  return {
    insights: { score: 43, "Is contract verified on Etherscan?": "Yes"},

  };
};

