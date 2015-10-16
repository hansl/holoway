'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Settings = (function () {
  function Settings(names) {
    _classCallCheck(this, Settings);

    if (typeof names == 'object' && !(names instanceof Array)) {
      this._set(names);
    } else {
      var _ref;

      if (typeof names == 'string') {
        names = [names];
      }

      names = (_ref = []).concat.apply(_ref, _toConsumableArray(names.map(function (v) {
        return [v, './' + v];
      })));

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _name = _step.value;

          var json = this._load(_name);
          if (json) {
            this._set(json);
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }

  _createClass(Settings, [{
    key: '_set',
    value: function _set(o) {
      var _this = this;

      var _ = Object.create(null);
      if (typeof o == 'object') {
        _ = JSON.parse(JSON.stringify(o));
      }

      var target = this;
      while (target && target !== Settings.prototype) {
        var properties = Object.getOwnPropertyNames(target);
        properties.filter(function (_) {
          return _ != 'constructor';
        });

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          var _loop = function () {
            var property = _step2.value;

            if (property.match(/^_/)) {
              (function () {
                var name = property.substr(1);
                Object.defineProperty(_this, name, {
                  get: function get() {
                    if (name in _) {
                      return _[name];
                    } else {
                      return this[property];
                    }
                  }
                });
              })();
            }
          };

          for (var _iterator2 = properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        target = Object.getPrototypeOf(target);
      }
    }
  }, {
    key: '_load',
    value: function _load(name) {
      // We go two parents to ignore this own module.
      var parent = module.parent.parent;

      while (parent) {
        var json = null;

        try {
          json = parent.require(name);
        } catch (e) {}

        if (json) {
          return json;
        }
        parent = parent.parent;
      }
      return null;
    }
  }]);

  return Settings;
})();

exports.Settings = Settings;