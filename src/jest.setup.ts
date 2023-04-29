import '@testing-library/jest-dom';

import { server } from './mocks/server';

jest.mock('@config/index', () => {
  return {
    SERVER_URL: 'http://localhost:8080',
  };
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
  jest.resetModules();
  jest.unmock('@config/index');
});
