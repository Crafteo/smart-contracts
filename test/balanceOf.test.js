const CrafteoToken = artifacts.require('../contracts/CrafteoToken');
const Web3 = require('web3');

contract('balanceOf test', (accounts) => { 
    const tokenTotalSupply = Web3.utils.toWei('1000000000', 'ether');
    
    let contractInstance;
    const ownerAddress = accounts[0];

    before(() => {
        web3.eth.defaultAccount = ownerAddress;
    });

    beforeEach(async () => {
        contractInstance = await CrafteoToken.new();
    });

    it('should return account balance correctly', async () => {
        const result = await contractInstance.balanceOf(ownerAddress, { from: ownerAddress });
        
        assert.equal(result, tokenTotalSupply, 'balance is wrong');
    });
});