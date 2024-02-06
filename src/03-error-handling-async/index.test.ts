import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const res = await resolveValue('abc');
    expect(res).toBe('abc');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('custom error')).toThrow(new Error('custom error'));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});
