"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GeneralSettings;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function getColumns(column, unusedColumns) {
  return (0, _lodash.filter)([column, ...unusedColumns], v => !(0, _lodash.isNil)(v));
}

function GeneralSettings(_ref) {
  var options = _ref.options,
      data = _ref.data,
      onOptionsChange = _ref.onOptionsChange;
  var unusedColumns = (0, _react.useMemo)(() => (0, _lodash.difference)((0, _lodash.map)(data.columns, c => c.name), [options.latColName, options.lonColName, options.classify]), [data, options.latColName, options.lonColName, options.classify]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Latitude Column Name",
    "data-test": "Map.Editor.LatitudeColumnName",
    value: options.latColName,
    onChange: latColName => onOptionsChange({
      latColName
    })
  }, (0, _lodash.map)(getColumns(options.latColName, unusedColumns), col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: col,
    "data-test": "Map.Editor.LatitudeColumnName." + col
  }, col)))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Longitude Column Name",
    "data-test": "Map.Editor.LongitudeColumnName",
    value: options.lonColName,
    onChange: lonColName => onOptionsChange({
      lonColName
    })
  }, (0, _lodash.map)(getColumns(options.lonColName, unusedColumns), col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: col,
    "data-test": "Map.Editor.LongitudeColumnName." + col
  }, col)))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Group By",
    "data-test": "Map.Editor.GroupBy",
    allowClear: true,
    placeholder: "none",
    value: options.classify || undefined,
    onChange: column => onOptionsChange({
      classify: column || null
    })
  }, (0, _lodash.map)(getColumns(options.classify, unusedColumns), col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: col,
    "data-test": "Map.Editor.GroupBy." + col
  }, col)))));
}

GeneralSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=GeneralSettings.js.map