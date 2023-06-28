"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GeneralSettings;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var Grid = _interopRequireWildcard(require("antd/lib/grid"));

var _propTypes = require("../../prop-types");

var _editor = require("../../../components/visualizations/editor");

var _visualizationsSettings = require("../../visualizationsSettings");

var _useLoadGeoJson3 = _interopRequireDefault(require("../hooks/useLoadGeoJson"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function GeneralSettings(_ref) {
  var options = _ref.options,
      data = _ref.data,
      onOptionsChange = _ref.onOptionsChange;

  var _useLoadGeoJson = (0, _useLoadGeoJson3.default)(options.mapType),
      _useLoadGeoJson2 = _slicedToArray(_useLoadGeoJson, 2),
      geoJson = _useLoadGeoJson2[0],
      isLoadingGeoJson = _useLoadGeoJson2[1];

  var geoJsonFields = (0, _react.useMemo)(() => (0, _utils.getGeoJsonFields)(geoJson), [geoJson]); // While geoJson is loading - show last selected field in select

  var targetFields = isLoadingGeoJson ? (0, _lodash.filter)([options.targetField], _lodash.isString) : geoJsonFields;
  var fieldNames = (0, _lodash.get)(_visualizationsSettings.visualizationsSettings, "choroplethAvailableMaps.".concat(options.mapType, ".fieldNames"), {});
  var handleMapChange = (0, _react.useCallback)(mapType => {
    onOptionsChange({
      mapType: mapType || null
    });
  }, [onOptionsChange]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Map",
    "data-test": "Choropleth.Editor.MapType",
    defaultValue: options.mapType,
    onChange: handleMapChange
  }, (0, _lodash.map)(_visualizationsSettings.visualizationsSettings.choroplethAvailableMaps, (_, mapType) =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: mapType,
    "data-test": "Choropleth.Editor.MapType.".concat(mapType)
  }, (0, _lodash.get)(_visualizationsSettings.visualizationsSettings, "choroplethAvailableMaps.".concat(mapType, ".name"), mapType))))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(Grid.Row, {
    gutter: 15
  }, /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Key Column",
    className: "w-100",
    "data-test": "Choropleth.Editor.KeyColumn",
    disabled: data.columns.length === 0,
    defaultValue: options.keyColumn,
    onChange: keyColumn => onOptionsChange({
      keyColumn
    })
  }, (0, _lodash.map)(data.columns, (_ref2) => {
    var name = _ref2.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      _react.default.createElement(_editor.Select.Option, {
        key: name,
        "data-test": "Choropleth.Editor.KeyColumn.".concat(name)
      }, name)
    );
  }))), /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Target Field",
    className: "w-100",
    "data-test": "Choropleth.Editor.TargetField",
    disabled: isLoadingGeoJson || targetFields.length === 0,
    loading: isLoadingGeoJson,
    value: options.targetField,
    onChange: targetField => onOptionsChange({
      targetField
    })
  }, (0, _lodash.map)(targetFields, field =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: field,
    "data-test": "Choropleth.Editor.TargetField.".concat(field)
  }, fieldNames[field] || field)))))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Value Column",
    "data-test": "Choropleth.Editor.ValueColumn",
    disabled: data.columns.length === 0,
    defaultValue: options.valueColumn,
    onChange: valueColumn => onOptionsChange({
      valueColumn
    })
  }, (0, _lodash.map)(data.columns, (_ref3) => {
    var name = _ref3.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      _react.default.createElement(_editor.Select.Option, {
        key: name,
        "data-test": "Choropleth.Editor.ValueColumn.".concat(name)
      }, name)
    );
  }))));
}

GeneralSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=GeneralSettings.js.map