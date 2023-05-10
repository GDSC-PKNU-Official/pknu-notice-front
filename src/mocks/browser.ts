import { setupWorker } from 'msw';

import { handlers } from './handlers';
import { announceHandlers } from './handlers/announceHandlers';

export const worker = setupWorker(...handlers, ...announceHandlers); // 브라우저 환경 서버
