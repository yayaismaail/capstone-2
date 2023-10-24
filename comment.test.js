import { itemsCount } from './src/module/commenthandler.js';

describe('response is 5', () => {
  test('item counts', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(
        [
          { item: 'A' },
          { item: 'B' },
          { item: 'C' },
          { item: 'D' },
          { item: 'F' },
        ],
      ),
    }));

    const res = await itemsCount();
    expect(res.length).toBe(5);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('null response', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(null),
    }));

    const res = await itemsCount();
    expect(res).toBe(null);
  });

  test('empty response', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve([]),
    }));

    const res = await itemsCount();
    expect(res.length).toBe(0);
  });
});