"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.Model = Model;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _createSuperKlass(fieldDefinition, options) {
  var fields = Object.create(null);

  var SuperKlass = (function () {
    function SuperKlass() {
      _classCallCheck(this, SuperKlass);
    }

    _createClass(SuperKlass, [{
      key: "fields",
      get: function get() {
        return fields;
      }
    }]);

    return SuperKlass;
  })();

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(fieldDefinition)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var fName = _step.value;

      var fValue = fieldDefinition[fName];
      fields[fName] = {
        name: fName,
        type: fieldDefinition[fName].constructor
      };
      Object.extend(SuperKlass[prototype], {
        // get [fName]() { return this._values[fName]. }
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function Model(fields, options) {
  return function (Klass) {
    var SuperKlass = _createSuperKlass(fields, options);
    Klass.prototype = SuperKlass;
    return Klass;
  };
}

var NumberField = function NumberField(options) {
  _classCallCheck(this, NumberField);

  this._value = options["default"];
};

exports.NumberField = NumberField;