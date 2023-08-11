# CrafteoToken

The CrafteoToken is a Solidity smart contract built on the ERC20 standard. 
This repository contains the code, dependencies, and scripts required to compile, build, test, and deploy the contract.



## Prerequisites

- Node.js v12.x or higher
- [Truffle](https://trufflesuite.com/) v5.11.2  
- [Ganache](https://trufflesuite.com/docs/ganache/quickstart/) for local development testing

## Installation

1. **Clone the repository**
```
git clone https://github.com/crafteo/smart-contracts.git

cd smart-contracts
```
2. **Install dependencies**
```
yarn install
``` 

## Configuration

Before compiling and deploying, you need to configure the necessary environment variables.

Create a `.env` file in the root directory with the following variables:

- `NETWORK`: development, bsc_mainnet, bsc_testnet, sepolia
- `MNEMONIC`: Your wallet's mnemonic
- `INFURA_PROJECT_URL`: Infura project URL for Sepolia network
- `BSC_SCAN_API_KEY`: Binance Smart Chain API key (if using Truffle Verify plugin)

You can create specific environment configuration files for different networks. 

For example, if you choose the Sepolia network, you can create a `.sepolia.env` (`.{NETWORK}.env`) file in the root directory and put the specific variables there.

## Building

To build the contract code, run the following command:
```
yarn run build
```
## Deployment
- Development (Requires Ganache)
```
yarn run deploy:dev
```
- Sepolia
```
yarn run deploy:sepolia
```
- Binance Smart Chain Testnet
```
yarn run deploy:bsc_testnet
```
- Binance Smart Chain Mainnet
```
yarn run deploy:bsc
```

### Compiler Configuration

The contract is configured to be compiled with Solidity version 0.8.13. You can change this version in the `truffle-config.js` file under the `compilers` section.
