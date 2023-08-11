const CrafteoToken = artifacts.require('../contracts/CrafteoToken');

const Web3 = require('web3');
contract('constructor test', (accounts) => {

    const tokenName = 'CrafteoAI';
    const tokenSymbol = 'NFTC';
    const tokenDecimals = 18;
    const tokenTotalSupply = Web3.utils.toWei('1000000000', 'ether');

    let contractInstance;
    const ownerAddress = accounts[0];

    before(() => {
        web3.eth.defaultAccount = ownerAddress;
    });

    it('should set name', async () => {
        contractInstance = await CrafteoToken.new();
        const result = await contractInstance.name();
        
        assert.equal(tokenName, result, 'name is wrong');
    });

    it('should set symbol', async () => {
        contractInstance = await CrafteoToken.new();
        const result = await contractInstance.symbol();
        
        assert.equal(tokenSymbol, result, 'symbol is wrong');
    });

    it('should set decimals', async () => {
        contractInstance = await CrafteoToken.new();
        const result = await contractInstance.decimals();
        
        assert.equal(tokenDecimals, result, 'decimals is wrong');
    });

    it('should set totalSupply', async () => {
        contractInstance = await CrafteoToken.new();
        const result = await contractInstance.totalSupply();
        assert.equal(tokenTotalSupply, result, 'totalSupply is wrong');
    });

});