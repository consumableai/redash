"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initJsonColumn;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _JsonViewInteractive = _interopRequireDefault(require("../../../components/json-view-interactive/JsonViewInteractive"));

var _visualizationsSettings = require("../../visualizationsSettings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initJsonColumn(column) {
  function prepareData(row) {
    var text = row[column.name];

    if ((0, _lodash.isString)(text) && text.length <= _visualizationsSettings.visualizationsSettings.tableCellMaxJSONSize) {
      try {
        return {
          text,
          value: JSON.parse(text)
        };
      } catch (e) {// ignore `JSON.parse` error and return default value
      }
    }

    return {
      text,
      value: undefined
    };
  }

  function JsonColumn(_ref) {
    var row = _ref.row;

    // eslint-disable-line react/prop-types
    var _prepareData = prepareData(row),
        text = _prepareData.text,
        value = _prepareData.value;

    if ((0, _lodash.isUndefined)(value)) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "json-cell-invalid"
      }, "" + text);
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "json-cell-valid"
    }, /*#__PURE__*/_react.default.createElement(_JsonViewInteractive.default, {
      value: value
    }));
  }

  JsonColumn.prepareData = prepareData;
  return JsonColumn;
}

initJsonColumn.friendlyName = "JSON";
//# sourceMappingURL=json.js.map