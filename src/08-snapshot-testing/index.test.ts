import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];
    const res = generateLinkedList(values);
    const expectedRes = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null
          }
        }
      }
    }
    expect(res).toStrictEqual(expectedRes);
  });

  test('should generate linked list from values 2', () => {
    const values = [1, 2, 3];
    const res = generateLinkedList(values);
    expect(res).toMatchSnapshot();
  });
});
