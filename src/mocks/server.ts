import { setupServer } from 'msw/node';
import rounds from './handlers/rounds.handler';
import token from './handlers/token.handler';


export const worker = setupServer(...token, ...rounds);
