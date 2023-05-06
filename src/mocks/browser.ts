import { setupWorker } from 'msw';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers); // 브라우저 환경 서버
