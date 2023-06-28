"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Renderer;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _PivotTableUI = _interopRequireDefault(require("react-pivottable/PivotTableUI"));

var _propTypes = require("../prop-types");

var _utils = require("../../lib/utils");

require("react-pivottable/pivottable.css");

require("./renderer.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var VALID_OPTIONS = ["rows", "cols", "vals", "aggregatorName", "valueFilter", "sorters", "rowOrder", "colOrder", "derivedAttributes", "rendererName", "hiddenAttributes", "hiddenFromAggregators", "hiddenFromDragDrop", "menuLimit", "unusedOrientationCutoff", "controls", "rendererOptions"];

function formatRows(_ref) {
  var rows = _ref.rows,
      columns = _ref.columns;
  return (0, _lodash.map)(rows, row => (0, _lodash.mapValues)(row, (value, key) => (0, _utils.formatColumnValue)(value, (0, _lodash.find)(columns, {
    name: key
  }).type)));
}

function Renderer(_ref2) {
  var data = _ref2.data,
      options = _ref2.options,
      onOptionsChange = _ref2.onOptionsChange;

  var _useState = (0, _react.useState)(_objectSpread({}, options)),
      _useState2 = _slicedToArray(_useState, 2),
      config = _useState2[0],
      setConfig = _useState2[1];

  var dataRows = (0, _react.useMemo)(() => formatRows(data), [data]);
  (0, _react.useEffect)(() => {
    setConfig(_objectSpread({}, options));
  }, [options]);

  var onChange = updatedOptions => {
    var validOptions = (0, _lodash.pick)(updatedOptions, VALID_OPTIONS);
    setConfig(_objectSpread({}, validOptions));
    onOptionsChange(validOptions);
  }; // Legacy behavior: hideControls when controls.enabled is true


  var hideControls = (0, _lodash.get)(options, "controls.enabled");
  var hideRowTotals = !(0, _lodash.get)(options, "rendererOptions.table.rowTotals");
  var hideColumnTotals = !(0, _lodash.get)(options, "rendererOptions.table.colTotals");
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "pivot-table-visualization-container",
    "data-hide-controls": hideControls || null,
    "data-hide-row-totals": hideRowTotals || null,
    "data-hide-column-totals": hideColumnTotals || null,
    "data-test": "PivotTableVisualization"
  }, /*#__PURE__*/_react.default.createElement(_PivotTableUI.default, _extends({}, (0, _lodash.pick)(config, VALID_OPTIONS), {
    data: dataRows,
    onChange: onChange
  })));
}

Renderer.propTypes = _propTypes.RendererPropTypes;
Renderer.defaultProps = {
  onOptionsChange: () => {}
};
//# sourceMappingURL=Renderer.js.map