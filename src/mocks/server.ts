import { setupServer } from 'msw/node';

import { majorHandlers } from './handlers/majorHandlers';
import { testHandlers } from './handlers/testhandlers';

export const server = setupServer(...majorHandlers, ...testHandlers);
