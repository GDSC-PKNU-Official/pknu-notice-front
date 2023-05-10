import { setupServer } from 'msw/node';

import { handlers } from './handlers';
import { announceHandlers } from './handlers/announceHandlers';

export const server = setupServer(...handlers, ...announceHandlers);
