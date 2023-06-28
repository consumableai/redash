"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTextFormatter = createTextFormatter;
exports.createDateTimeFormatter = createDateTimeFormatter;
exports.createBooleanFormatter = createBooleanFormatter;
exports.createNumberFormatter = createNumberFormatter;
exports.formatSimpleTemplate = formatSimpleTemplate;

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _moment = _interopRequireDefault(require("moment/moment"));

var _numeral = _interopRequireDefault(require("numeral"));

var _lodash = require("lodash");

var _visualizationsSettings = require("../visualizations/visualizationsSettings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_numeral.default.options.scalePercentBy100 = false; // eslint-disable-next-line

var urlPattern = /(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function createTextFormatter(highlightLinks) {
  if (highlightLinks) {
    return value => {
      if ((0, _lodash.isString)(value)) {
        var Link = _visualizationsSettings.visualizationsSettings.LinkComponent;
        value = value.replace(urlPattern, (unused, prefix, href) => {
          var link = _server.default.renderToStaticMarkup( /*#__PURE__*/_react.default.createElement(Link, {
            href: href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, href));

          return prefix + link;
        });
      }

      return (0, _lodash.toString)(value);
    };
  }

  return value => (0, _lodash.toString)(value);
}

function toMoment(value) {
  if (_moment.default.isMoment(value)) {
    return value;
  }

  if ((0, _lodash.isFinite)(value)) {
    return (0, _moment.default)(value);
  } // same as default `moment(value)`, but avoid fallback to `new Date()`


  return (0, _moment.default)((0, _lodash.toString)(value), [_moment.default.ISO_8601, _moment.default.RFC_2822]);
}

function createDateTimeFormatter(format) {
  if ((0, _lodash.isString)(format) && format !== "") {
    return value => {
      var wrapped = toMoment(value);
      return wrapped.isValid() ? wrapped.format(format) : (0, _lodash.toString)(value);
    };
  }

  return value => (0, _lodash.toString)(value);
}

function createBooleanFormatter(values) {
  if ((0, _lodash.isArray)(values)) {
    if (values.length >= 2) {
      // Both `true` and `false` specified
      return value => {
        if ((0, _lodash.isNil)(value)) {
          return "";
        }

        return "" + values[value ? 1 : 0];
      };
    } else if (values.length === 1) {
      // Only `true`
      return value => value ? values[0] : "";
    }
  }

  return value => {
    if ((0, _lodash.isNil)(value)) {
      return "";
    }

    return value ? "true" : "false";
  };
}

function createNumberFormatter(format) {
  if ((0, _lodash.isString)(format) && format !== "") {
    var n = (0, _numeral.default)(0); // cache `numeral` instance

    return value => value === null || value === "" ? "" : n.set(value).format(format);
  }

  return value => (0, _lodash.toString)(value);
}

function formatSimpleTemplate(str, data) {
  if (!(0, _lodash.isString)(str)) {
    return "";
  }

  return str.replace(/{{\s*([^\s]+?)\s*}}/g, (match, prop) => {
    if (hasOwnProperty.call(data, prop) && !(0, _lodash.isUndefined)(data[prop])) {
      return data[prop];
    }

    return match;
  });
}
//# sourceMappingURL=value-format.js.map