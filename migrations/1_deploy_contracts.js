const CrafteoToken = artifacts.require("CrafteoToken");
// const Web3 = require('web3');

module.exports = function(deployer) { 
  deployer.deploy(CrafteoToken);
};
