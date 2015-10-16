'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _settingsApp_settings = require('./settings/app_settings');

var _libAnnotations = require('./lib/annotations');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var Holoway = (function () {
  function Holoway() {
    var _this = this;

    _classCallCheck(this, Holoway);

    var settings = null;
    try {
      settings = this._findSettings();
    } catch (e) {}
    this._settings = new _settingsApp_settings.AppSettings(['settings.json', 'settings']);

    setTimeout(function () {
      return _this._init();
    }, 0);
  }

  _createDecoratedClass(Holoway, [{
    key: '_init',
    decorators: [_libAnnotations.once],
    value: function _init() {
      if (!this._app) {
        this._app = (0, _express2['default'])();
      }

      var server = this._app.listen(this._settings.port, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Listening at http://%s:%s', host, port);
      });
    }
  }, {
    key: 'app',
    set: function set(a) {
      this._app = a;
    }
  }, {
    key: 'settings',
    set: function set(s) {
      // Doing it like this ensures we have a full copy and that it's only
      // JSON data (e.g. no functions).
      this._settings = new _settingsApp_settings.AppSettings(s);
    }
  }]);

  return Holoway;
})();

exports['default'] = new Holoway();
module.exports = exports['default'];