import { setupServer } from 'msw/node';

import { majorHandlers } from './handlers/majorHandlers';
import { testHandlers } from './handlers/testHandlers';

export const server = setupServer(...majorHandlers, ...testHandlers);
