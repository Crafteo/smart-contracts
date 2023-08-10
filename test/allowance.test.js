const CrafteoToken = artifacts.require('../contracts/CrafteoToken');
const Assert = require('truffle-assertions');

contract('allowance test', (accounts) => {
    const tokenTotalSupply = 1000000000;

    let contractInstance;
    const ownerAddress = accounts[0];
    const address1 = accounts[1];

    before(() => {
        web3.eth.defaultAccount = ownerAddress;
    });

    beforeEach(async () => {
        contractInstance = await CrafteoToken.new(tokenTotalSupply);
    });

    it('should return zero allowance for a not allowed address', async () => {
        const result = await contractInstance.allowance(ownerAddress, address1, { from: ownerAddress });
        assert.equal(0, result.toNumber(), 'wrong result');
    });

    it('should return correct allowance amount for an approved address', async () => {
        const expectedAmount = 1000;
        
        await contractInstance.approve(address1, expectedAmount, { from: ownerAddress });
        const result = await contractInstance.allowance(ownerAddress, address1, { from: ownerAddress });
        
        assert.equal(expectedAmount, result.toNumber(), 'wrong result');
    });

});