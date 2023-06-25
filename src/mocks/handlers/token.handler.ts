import { rest } from 'msw';
import { environment } from 'src/environments/environment';
import * as bearerToken from '../data/token/bearer-token.mock.json';

export default [rest.post(`${environment.connection}/auth/monitor`, (req, res, ctx) => res(ctx.json(bearerToken)))];
