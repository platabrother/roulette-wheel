import { setupWorker } from 'msw';
import rounds from './handlers/rounds.handler';
import token from './handlers/token.handler';


export const worker = setupWorker(...token, ...rounds);
