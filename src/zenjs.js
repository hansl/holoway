import {AppSettings} from './settings/app_settings';
import {once} from './lib/annotations';

import express from 'express';


class ZenJs {
  _settings: Object<string, any>

  constructor() {
    let settings = null;
    try {
      settings = this._findSettings();
    }
    catch(e) {
    }
    this._settings = new AppSettings(['settings.json', 'settings']);

    setTimeout(() => this._init(), 0);
  }

  @once
  _init() {
    if (!this._app) {
      this._app = express();
    }

    const server = this._app.listen(this._settings.port, () => {
      const host: number = server.address().address;
      const port: number = server.address().port;

      console.log('Listening at http://%s:%s', host, port);
    });
  }

  set app(a) {
    this._app = a;
  }

  set settings(s) {
    // Doing it like this ensures we have a full copy and that it's only
    // JSON data (e.g. no functions).
    this._settings = new AppSettings(s);
  }
}


export const manager = new ZenJs();
export const models = {};
