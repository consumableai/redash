"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DetailsRenderer;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _propTypes = require("../prop-types");

var _visualizationsSettings = require("../visualizationsSettings");

var _descriptions = _interopRequireDefault(require("antd/lib/descriptions"));

var _pagination = _interopRequireDefault(require("antd/lib/pagination"));

require("./details.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function renderValue(value, type) {
  var formats = {
    date: _visualizationsSettings.visualizationsSettings.dateFormat,
    datetime: _visualizationsSettings.visualizationsSettings.dateTimeFormat
  };

  if (type === "date" || type === "datetime") {
    if (_moment.default.isMoment(value)) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return value.format(formats[type]);
    }
  }

  return "" + value;
}

function DetailsRenderer(_ref) {
  var data = _ref.data;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      page = _useState2[0],
      setPage = _useState2[1];

  if (!data || !data.rows || data.rows.length === 0) {
    return null;
  }

  var types = (0, _lodash.mapValues)((0, _lodash.keyBy)(data.columns, "name"), "type"); // We use columsn to maintain order of columns in the view.

  var columns = data.columns.map(column => column.name);
  var row = data.rows[page];
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "details-viz"
  }, /*#__PURE__*/_react.default.createElement(_descriptions.default, {
    size: "small",
    column: 1,
    bordered: true
  }, (0, _lodash.map)(columns, key => /*#__PURE__*/_react.default.createElement(_descriptions.default.Item, {
    key: key,
    label: key
  }, renderValue(row[key], types[key])))), data.rows.length > 1 && /*#__PURE__*/_react.default.createElement("div", {
    className: "paginator-container"
  }, /*#__PURE__*/_react.default.createElement(_pagination.default, {
    showSizeChanger: false,
    current: page + 1,
    defaultPageSize: 1,
    total: data.rows.length,
    onChange: p => setPage(p - 1)
  })));
}

DetailsRenderer.propTypes = _propTypes.RendererPropTypes;
//# sourceMappingURL=DetailsRenderer.js.map