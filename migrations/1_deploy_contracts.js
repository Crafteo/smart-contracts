const CrafteoToken = artifacts.require("CrafteoToken");

module.exports = function(deployer) { 
  deployer.deploy(CrafteoToken, 100 );
};
