const CrafteoToken = artifacts.require("CrafteoToken");
const Web3 = require('web3');

module.exports = function(deployer) { 
  const weiValue = Web3.utils.toWei('1000000000', 'ether'); 
  deployer.deploy(CrafteoToken, weiValue);
};
