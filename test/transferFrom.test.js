const CrafteoToken = artifacts.require('../contracts/CrafteoToken');
const Assert = require('truffle-assertions');

contract('transferFrom test', (accounts) => {

    let contractInstance;
    const ownerAddress = accounts[0];
    const address1 = accounts[1];
    const address2 = accounts[2];

    before(() => {
        web3.eth.defaultAccount = ownerAddress;
    });

    beforeEach(async () => {
        contractInstance = await CrafteoToken.new();
    });

    it('transferFrom should throw if balance is insufficient', async () => {
        await Assert.reverts(
            contractInstance.transferFrom(address1, address2, 1000, { from: address1 }),
            'ERC20: insufficient allowance'
        );
    });

    it('transferFrom should throw if sender is not approved', async () => {
        await Assert.reverts(
            contractInstance.transferFrom(ownerAddress, address1, 1000, { from: ownerAddress }),
            'ERC20: insufficient allowance'
        );
    });

    it('transferFrom success', async () => {
        await contractInstance.approve(address1, 1000, { from: ownerAddress });
        const result = await contractInstance.transferFrom(ownerAddress, address2, 1000, { from: address1 });
        
        Assert.eventEmitted(result, 'Transfer');

        const address2Balance = await contractInstance.balanceOf(address2, { from: address1 }); 
        assert.equal(address2Balance.toString(), 1000, 'tokens are not transferred to the destination address');
    });
});