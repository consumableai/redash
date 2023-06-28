"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Input;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

var _input = _interopRequireDefault(require("antd/lib/input"));

var _typography = _interopRequireDefault(require("antd/lib/typography"));

var _Swatch = _interopRequireDefault(require("./Swatch"));

require("./input.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function preparePresets(presetColors, presetColumns) {
  presetColors = (0, _lodash.isArray)(presetColors) ? (0, _lodash.map)(presetColors, v => [null, v]) : (0, _lodash.toPairs)(presetColors);
  presetColors = (0, _lodash.map)(presetColors, (_ref) => {
    var _ref2 = _slicedToArray(_ref, 2),
        title = _ref2[0],
        value = _ref2[1];

    if ((0, _lodash.isNil)(value)) {
      return [title, null];
    }

    value = (0, _tinycolor.default)(value);

    if (value.isValid()) {
      return [title, "#" + value.toHex().toUpperCase()];
    }

    return null;
  });
  return (0, _lodash.chunk)((0, _lodash.filter)(presetColors), presetColumns);
}

function validateColor(value, callback) {
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#";

  if ((0, _lodash.isNil)(value)) {
    callback(null);
  }

  value = (0, _tinycolor.default)(value);

  if (value.isValid()) {
    callback(prefix + value.toHex().toUpperCase());
  }
}

function Input(_ref3) {
  var color = _ref3.color,
      presetColors = _ref3.presetColors,
      presetColumns = _ref3.presetColumns,
      onChange = _ref3.onChange,
      onPressEnter = _ref3.onPressEnter;

  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isInputFocused = _useState4[0],
      setIsInputFocused = _useState4[1];

  var presets = preparePresets(presetColors, presetColumns);

  function handleInputChange(value) {
    setInputValue(value);
    validateColor(value, onChange);
  }

  (0, _react.useEffect)(() => {
    if (!isInputFocused) {
      validateColor(color, setInputValue, "");
    }
  }, [color, isInputFocused]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (0, _lodash.map)(presets, (group, index) => /*#__PURE__*/_react.default.createElement("div", {
    className: "color-picker-input-swatches",
    key: "preset-row-".concat(index)
  }, (0, _lodash.map)(group, (_ref4) => {
    var _ref5 = _slicedToArray(_ref4, 2),
        title = _ref5[0],
        value = _ref5[1];

    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
      _react.default.createElement(_Swatch.default, {
        key: value,
        color: value,
        title: title,
        size: 30,
        onClick: () => validateColor(value, onChange)
      })
    );
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "color-picker-input"
  }, /*#__PURE__*/_react.default.createElement(_input.default, {
    "data-test": "ColorPicker.CustomColor",
    addonBefore: /*#__PURE__*/_react.default.createElement(_typography.default.Text, {
      type: "secondary"
    }, "#"),
    value: inputValue,
    onChange: e => handleInputChange(e.target.value),
    onFocus: () => setIsInputFocused(true),
    onBlur: () => setIsInputFocused(false),
    onPressEnter: onPressEnter
  })));
}

Input.defaultProps = {
  color: "#FFFFFF",
  presetColors: null,
  presetColumns: 8,
  onChange: () => {},
  onPressEnter: () => {}
};
//# sourceMappingURL=Input.js.map