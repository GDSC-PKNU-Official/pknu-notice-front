import '@testing-library/jest-dom';

import { server } from './mocks/server';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addListener: function () {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeListener: function () {},
    };
  };

jest.mock('@config/index', () => {
  return {
    SERVER_URL: 'http://localhost:8080',
  };
});

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});

afterAll(() => {
  server.close();
  jest.resetModules();
  jest.unmock('@config/index');
});
