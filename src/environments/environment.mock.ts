// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import packageJson from '../../package.json';

export const environment = {
  appName: 'Ruleta de la Fortuna',
  appVersion: packageJson.version,
  production: false,
  mockServer: true,
  connection: 'http://38.242.243.231:3005',
  tokenReader: 'bW9uaXRvcjoxMjM0',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
