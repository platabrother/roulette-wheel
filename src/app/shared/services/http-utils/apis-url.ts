import { environment } from 'src/environments/environment';
export interface ApiUrl {
  path: string;
  server: string;
}

export const API_KEY_CONNECTION = {
  GET_TOKEN: 'bearerToken',
  GET_LASTROUND: 'getLastRound',
  GET_NEXTROUND: 'getNextRound'
};


export const APIS_URL = {
  [API_KEY_CONNECTION.GET_TOKEN]: {
    path: '/auth/monitor',
    server: environment.connection
  },
  [API_KEY_CONNECTION.GET_LASTROUND]: {
    path: '/rounds/lastrounds',
    server: environment.connection
  },
  [API_KEY_CONNECTION.GET_NEXTROUND]: {
    path: '/rounds/nextround',
    server: environment.connection
  }
};