import { simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 3, action: '+' });
    expect(res).toBe(5);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({ a: 5, b: 2, action: '-' });
    expect(res).toBe(3);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 5, action: '*' });
    expect(res).toBe(10);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({ a: 10, b: 2, action: '/' });
    expect(res).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 3, action: '^' });
    expect(res).toBe(8);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({ a: 1, b: 2, action: 'x' });
    expect(res).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const res = simpleCalculator({ a: 'a', b: true, action: '+' });
    expect(res).toBe(null);
  });
});
