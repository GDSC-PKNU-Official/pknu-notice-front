import { setupWorker } from 'msw';

import { announceHandlers } from './handlers/announceHandlers';
import { majorHandlers } from './handlers/majorHandlers';
import { testHandlers } from './handlers/testHandlers';

export const worker = setupWorker(
  ...majorHandlers,
  ...testHandlers,
  ...announceHandlers,
); // 브라우저 환경 서버
