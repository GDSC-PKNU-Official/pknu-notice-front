import { setupWorker } from 'msw';

import { majorHandlers } from './handlers/majorHandlers';
import { testHandlers } from './handlers/testHandlers';

export const worker = setupWorker(...majorHandlers, ...testHandlers); // 브라우저 환경 서버
