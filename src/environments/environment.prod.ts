import packageJson from '../../package.json';

export const environment = {
  appName: 'roulette',
  appVersion: packageJson.version,
  production: true,
  mockServer: false,
  connection: 'http://38.242.243.231:3005',
  tokenReader: 'bW9uaXRvcjoxMjM0',
};
