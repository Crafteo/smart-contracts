const CrafteoToken = artifacts.require("CrafteoToken");

contract('CrafteoToken', (accounts) => {
  it('should put 10000 CrafteoToken in the first account', async () => {
    const crafteoTokenInstance = await CrafteoToken.deployed();
    const balance = await crafteoTokenInstance.getBalance.call(accounts[0]);

    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });
  it('should call a function that depends on a linked library', async () => {
    const crafteoTokenInstance = await CrafteoToken.deployed();
    const crafteoTokenBalance = (await crafteoTokenInstance.getBalance.call(accounts[0])).toNumber();
    const crafteoTokenEthBalance = (await crafteoTokenInstance.getBalanceInEth.call(accounts[0])).toNumber();

    assert.equal(crafteoTokenEthBalance, 2 * crafteoTokenBalance, 'Library function returned unexpected function, linkage may be broken');
  });
  it('should send coin correctly', async () => {
    const crafteoTokenInstance = await CrafteoToken.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await crafteoTokenInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await crafteoTokenInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await crafteoTokenInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await crafteoTokenInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await crafteoTokenInstance.getBalance.call(accountTwo)).toNumber();

    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
