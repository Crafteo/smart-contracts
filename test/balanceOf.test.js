const CrafteoToken = artifacts.require('../contracts/CrafteoToken');

contract('balanceOf test', (accounts) => {
    const tokenTotalSupply = 1000000000;
    
    let contractInstance;
    const ownerAddress = accounts[0];

    before(() => {
        web3.eth.defaultAccount = ownerAddress;
    });

    beforeEach(async () => {
        contractInstance = await CrafteoToken.new(tokenTotalSupply);
    });

    it('should return account balance correctly', async () => {
        const result = await contractInstance.balanceOf(ownerAddress, { from: ownerAddress });
        
        assert.equal(result.toNumber(), tokenTotalSupply, 'balance is wrong');
    });
});