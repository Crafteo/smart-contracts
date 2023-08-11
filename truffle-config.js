if(process.env.NETWORK){
  require('dotenv').config({ override: true,  path: `.${ process.env.NETWORK }.env` });  
}else{ 
  require('dotenv').config();
}

const mnemonic = process.env["MNEMONIC"];   
const HDWalletProvider = require('@truffle/hdwallet-provider');
const plugins = ["solidity-coverage"];
const api_keys = {};
 
if(process.env['USE_TRUFFLE_VERIFY_PLUGIN'] && process.env['BSC_SCAN_API_KEY']){
  plugins.push('truffle-plugin-verify');
  api_keys['bscscan'] = process.env.BSC_SCAN_API_KEY;
}
module.exports = {
  plugins, 
  api_keys,
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
     }, 
     sepolia: { 
       provider: () => new HDWalletProvider(mnemonic, process.env.INFURA_PROJECT_URL),
       network_id: 11155111, 
     },
     bsc_testnet: {
       provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
       network_id: 97,
       confirmations: 4,
       timeoutBlocks: 200,
       skipDryRun: true
     },
     bsc: {
       provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
       network_id: 56,
       confirmations: 10,
       timeoutBlocks: 200,
       skipDryRun: true
     }
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.13",
    }
  }
};
