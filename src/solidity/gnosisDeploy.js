require('dotenv').config()
var ethers = require('ethers');

(async function main () {


    // goerli aclhemy provider
    const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_GOERLI_RPC);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const contractAddress ="0xa6b71e26c5e0845f74c812102ca7114b6a896ab2"
    // gnosis safe proxy factory - goerli
    const gnosisSafeAddress = "0x3e5c63644e683549055b9be8653de26e0b4cd36e";
    // gonosisSafeL2 goerli

    const setupGnosisFuncPrototype = ethers.utils.id("setup(address[],uint256,address,bytes,address,address,uint256,address)").slice(0,10)

    // gnosisSafe "setup" function params, bytes initializer for 'createProxyWithNonce' ->
    const owners = ['0x9b181CE2eB870E51645137DAe3534bDC831e7a6B',
                    '0x18CB966fA69778D9801D77EE0C4f23989adb6f6C'];

    const threshold = 2;
    const to = ethers.constants.AddressZero;
    const calldata = '0x';
    const fallbackhandler = "0xf48f2B2d2a534e402487b3ee7C18c33Aec0Fe5e4";
    const paymentToken = ethers.constants.AddressZero;
    const payment = ethers.constants.Zero;
    const paymentReceiver = ethers.constants.AddressZero;
    //<-


    const abi = ethers.utils.defaultAbiCoder;
    const params = abi.encode(
        ["address[]", "uint256", "address", "bytes", "address", "address", "uint256", "address"],  // encode as address array
        [ owners, threshold, to, calldata, fallbackhandler, paymentToken, payment, paymentReceiver]); // array to enc


    // bytes memory initializer for "createProxyWithNonce"
    const initializerBytesData = setupGnosisFuncPrototype+params.slice(2);


    const ProxyABI = [
        "function createProxyWithNonce(address _singleton, bytes memory initializer, uint256 saltNonce) public returns (GnosisSafeProxy proxy)"];


    const proxyFactory = new ethers.Contract(
        contractAddress,
        ProxyABI,
        provider
    );

    // random nonce value
    const nonce = ethers.BigNumber.from(ethers.utils.randomBytes(32));


    let gasLimit = 500000; // setting up 2 owners requires about 282k gas
    let gasPrice = ethers.utils.parseUnits("2", "gwei");
    // unsigned transaction
    let unsignedTx = await proxyFactory.populateTransaction.createProxyWithNonce(gnosisSafeAddress, initializerBytesData, nonce, {gasLimit:gasLimit,gasPrice:gasPrice});


    // replace with ethereum.request for metamask signage
    let receit = wallet.sendTransaction(unsignedTx);


    let txHash = "";
    receit.then(function(result){
        txHash = result.hash;
        console.log(result);
    });


    // after confirmation (15~30 seconds)
    // get the gnosis safe address (which is a proxy)
    // console.log((await provider.getTransactionReceipt(txHash)).logs[0].address);



})();
