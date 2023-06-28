"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BoundsSettings;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _useDebounce = require("use-debounce");

var Grid = _interopRequireWildcard(require("antd/lib/grid"));

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

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

function BoundsSettings(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;

  // Bounds may be changed in editor or on preview (by drag/zoom map).
  // Changes from preview does not come frequently (only when user release mouse button),
  // but changes from editor should be debounced.
  // Therefore this component has intermediate state to hold immediate user input,
  // which is updated from `options.bounds` and by inputs immediately on user input,
  // but `onOptionsChange` event is debounced and uses last value from internal state.
  var _useState = (0, _react.useState)(options.bounds),
      _useState2 = _slicedToArray(_useState, 2),
      bounds = _useState2[0],
      setBounds = _useState2[1];

  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(onOptionsChange, 200),
      _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
      onOptionsChangeDebounced = _useDebouncedCallback2[0];

  var _useLoadGeoJson = (0, _useLoadGeoJson3.default)(options.mapType),
      _useLoadGeoJson2 = _slicedToArray(_useLoadGeoJson, 1),
      geoJson = _useLoadGeoJson2[0]; // `options.bounds` could be empty only if user didn't edit bounds yet - through preview or in this editor.
  // In this case we should keep empty bounds value because it tells renderer to fit map every time.


  (0, _react.useEffect)(() => {
    if (options.bounds) {
      setBounds(options.bounds);
    } else {
      var defaultBounds = (0, _utils.getGeoJsonBounds)(geoJson);

      if (defaultBounds) {
        setBounds(defaultBounds);
      }
    }
  }, [options.bounds, geoJson]);
  var updateBounds = (0, _react.useCallback)((i, j, v) => {
    v = parseFloat(v); // InputNumber may emit `null` and empty strings instead of numbers

    if ((0, _lodash.isFinite)(v)) {
      var newBounds = (0, _lodash.cloneDeep)(bounds);
      newBounds[i][j] = v;
      setBounds(newBounds);
      onOptionsChangeDebounced({
        bounds: newBounds
      });
    }
  }, [bounds, onOptionsChangeDebounced]);
  var boundsAvailable = (0, _lodash.isArray)(bounds);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ControlLabel, {
    label: "North-East Latitude and Longitude"
  }, /*#__PURE__*/_react.default.createElement(Grid.Row, {
    gutter: 15
  }, /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    disabled: !boundsAvailable,
    value: boundsAvailable ? bounds[1][0] : undefined,
    onChange: value => updateBounds(1, 0, value)
  })), /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    disabled: !boundsAvailable,
    value: boundsAvailable ? bounds[1][1] : undefined,
    onChange: value => updateBounds(1, 1, value)
  }))))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ControlLabel, {
    label: "South-West Latitude and Longitude"
  }, /*#__PURE__*/_react.default.createElement(Grid.Row, {
    gutter: 15
  }, /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    disabled: !boundsAvailable,
    value: boundsAvailable ? bounds[0][0] : undefined,
    onChange: value => updateBounds(0, 0, value)
  })), /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    disabled: !boundsAvailable,
    value: boundsAvailable ? bounds[0][1] : undefined,
    onChange: value => updateBounds(0, 1, value)
  }))))));
}

BoundsSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=BoundsSettings.js.map