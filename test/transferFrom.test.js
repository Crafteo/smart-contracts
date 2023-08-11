const CrafteoToken = artifacts.require('../contracts/CrafteoToken');
const Assert = require('truffle-assertions');

contract('transferFrom test', (accounts) => {
    const tokenTotalSupply = 1000000000;

    let contractInstance;
    const ownerAddress = accounts[0];
    const address1 = accounts[1];
    const address2 = accounts[2];

    before(() => {
        web3.eth.defaultAccount = ownerAddress;
    });

    beforeEach(async () => {
        contractInstance = await CrafteoToken.new(tokenTotalSupply);
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
        await contractInstance.transfer(address1, 1000, { from: ownerAddress });
        await contractInstance.approve(address1, 1000, { from: ownerAddress });
        const result = await contractInstance.transferFrom(ownerAddress, address2, 1000, { from: address1 });
        
        Assert.eventEmitted(result, 'Transfer');
    });
});