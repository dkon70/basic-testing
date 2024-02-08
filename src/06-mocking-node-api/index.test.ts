import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    doStuffByTimeout(cb, 2000);
    expect(setTimeout).toBeCalledWith(cb, 2000);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 2000);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2000);
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const cb = jest.fn();
    doStuffByInterval(cb, 2000);
    expect(setInterval).toBeCalledWith(cb, 2000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 1000);
    jest.advanceTimersByTime(3000);
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously('/test/path');
    expect(spy).toBeCalledWith(__dirname, '/test/path');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously('/testFile.txt')).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockReturnValue(Promise.resolve('fake data'));
    expect(await readFileAsynchronously('/testFile.txt')).toBe('fake data');
  });
});
