import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const response = { data: {} };
    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockReturnValue(Promise.resolve(response));
    await throttledGetDataFromApi('/test');
    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL: 'https://jsonplaceholder.typicode.com' });
  });

  test('should perform request to correct provided url', async () => {
    const response = { data: {} };
    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockReturnValue(Promise.resolve(response));
    await throttledGetDataFromApi('/test');
    jest.advanceTimersByTime(5000);
    expect(mockedAxios.get).toBeCalledWith('/test');
  });

  test('should return response data', async () => {
    const responseValue = { id: 1, text: 'test' };
    const response = { data: responseValue };
    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockReturnValue(Promise.resolve(response));
    const res = await throttledGetDataFromApi('/test');
    expect(res).toEqual(responseValue);
  });
});
