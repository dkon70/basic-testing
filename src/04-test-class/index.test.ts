import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000000);
    expect(account.getBalance()).toBe(1000000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(1000)).toThrow('Insufficient funds');
  });

  test('should throw error when transferring more than balance', () => {
    const firstAccount = getBankAccount(100);
    const secondAccount = getBankAccount(100000);
    expect(() => firstAccount.transfer(1000, secondAccount)).toThrow(
      'Insufficient funds',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(1000, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(100);
    expect(account.getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const firstAccount = getBankAccount(150000);
    const secondAccount = getBankAccount(250000);
    firstAccount.transfer(50000, secondAccount);
    expect(firstAccount.getBalance()).toBe(100000);
    expect(secondAccount.getBalance()).toBe(300000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockReturnValue(Promise.resolve(100));
    expect(typeof (await account.fetchBalance())).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(10);
    jest.spyOn(account, 'fetchBalance').mockReturnValue(Promise.resolve(100));
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockReturnValue(Promise.resolve(null));
    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
