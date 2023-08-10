const CrafteoToken = artifacts.require('../contracts/CrafteoToken');
const Assert = require('truffle-assertions');

contract('approve test', (accounts) => {

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

    it('should not approve to zero address', async () => {  
        await Assert.reverts(
            contractInstance.approve('0x0000000000000000000000000000000000000000', 1000),
            'ERC20: approve to the zero address'
        );
    });

    it('should not approve from zero address', async () => {  
        await Assert.reverts(
            contractInstance.approve(address1, 1000, { from : '0x0000000000000000000000000000000000000000' }),
            'ERC20: approve from the zero address'
        );
    });

    it('should approve work correctly', async () => {
        const result = await contractInstance.approve(address1, 1000, { from: ownerAddress });
        
        Assert.eventEmitted(result, 'Approval');
    });
});