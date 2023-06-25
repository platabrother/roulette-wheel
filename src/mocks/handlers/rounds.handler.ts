import { rest } from 'msw';
import { environment } from '@environments/environment';

import * as lastRound from '../data/rounds/last-round.mock.json';
import * as nextRound from '../data/rounds/next-round.mock.json';

const ERROR_MESSAGE = 'Invalid format';

export default [
  rest.get(`${environment.connection}/rounds/lastrounds`, (req, res, ctx) => {
    const format = req.url.searchParams.get('_format');
    if (format === 'json') {
      return res(ctx.json(lastRound));
    }
    return res(ctx.status(400), ctx.json({ message: ERROR_MESSAGE }));
  }),

  rest.get(`${environment.connection}/rounds/nextround`, (req, res, ctx) => {
    const format = req.url.searchParams.get('_format');
    if (format === 'json') {
      return res(ctx.json(nextRound));
    }
    return res(ctx.status(400), ctx.json({ message: ERROR_MESSAGE }));
  })
]
