import { setupServer } from 'msw/node';

import { announceHandlers } from './handlers/announceHandlers';
import { majorHandlers } from './handlers/majorHandlers';
import { subscribeHandler } from './handlers/subscribeHandler';
import { testHandlers } from './handlers/testHandlers';

export const server = setupServer(
  ...majorHandlers,
  ...testHandlers,
  ...announceHandlers,
  ...subscribeHandler,
);
