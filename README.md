# MEV NFT: Protecting User MetaMask!

![mevNft](./img/flask_mev_nft.png)

Welcome to MEV NFT repository!

Within this repository you will find:
- Google Chrome Plugin for NFT Marketplace UI customization
- MM Snap Transaction Insights
- MM Snap snap_getBip32Entropy for Flashbots transactions
- Gnosis Safe

## Google Chrome Plugin

## MM Snap Transaction Insights

We are using MetaMask Transaction Insights to determine if transaction will transfer user assets. There have been many hacks were website front end was hijacked or website was giving false information about expected transaction. Imagine scenario were user signs transaction in order to be whitlisted for NFT minting however he is actually transfering his NFT's!

Our technical solution is to send transaction transaction calldata to Tenderly transaction simulation API. Transaction simulation returns Transaction Logs and we can see in logs if there was a critical event logged as Transfer, Approval, ApprovalForAll.

## Flashbots transactions

## Gnosis Safe
