import {Settings} from './settings';


export class AppSettings extends Settings {
  port: Number
  apps: Array<Function | String>

  get _apps() { return []; }
  get _port() { return 3000; }
}
