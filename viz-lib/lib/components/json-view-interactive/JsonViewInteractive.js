"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = JsonViewInteractive;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./json-view-interactive.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function JsonBlock(_ref) {
  var value = _ref.value,
      children = _ref.children,
      openingBrace = _ref.openingBrace,
      closingBrace = _ref.closingBrace,
      withKeys = _ref.withKeys;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isExpanded = _useState2[0],
      setIsExpanded = _useState2[1];

  var objectKeys = (0, _lodash.keys)(value);
  var count = objectKeys.length;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, count > 0 && /*#__PURE__*/_react.default.createElement("span", {
    className: "jvi-toggle",
    onClick: () => setIsExpanded(!isExpanded)
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: (0, _classnames.default)("fa", {
      "fa-caret-right": !isExpanded,
      "fa-caret-down": isExpanded
    })
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "jvi-punctuation jvi-braces"
  }, openingBrace), !isExpanded && count > 0 && /*#__PURE__*/_react.default.createElement("span", {
    className: "jvi-punctuation jvi-ellipsis",
    onClick: () => setIsExpanded(true)
  }, "\u2026"), isExpanded && /*#__PURE__*/_react.default.createElement("span", {
    className: "jvi-block"
  }, (0, _lodash.map)(objectKeys, (key, index) => {
    var isFirst = index === 0;
    var isLast = index === count - 1;
    var comma = isLast ? null : /*#__PURE__*/_react.default.createElement("span", {
      className: "jvi-punctuation jvi-comma"
    }, ",");
    return /*#__PURE__*/_react.default.createElement("span", {
      key: "item-" + key,
      className: (0, _classnames.default)("jvi-item", {
        "jvi-nested-first": isFirst,
        "jvi-nested-last": isLast
      })
    }, withKeys && /*#__PURE__*/_react.default.createElement("span", {
      className: "jvi-object-key"
    }, /*#__PURE__*/_react.default.createElement(JsonValue, {
      value: key
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "jvi-punctuation"
    }, ": "))), /*#__PURE__*/_react.default.createElement(JsonValue, {
      value: value[key]
    }, comma));
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "jvi-punctuation jvi-braces"
  }, closingBrace), children, !isExpanded && /*#__PURE__*/_react.default.createElement("span", {
    className: "jvi-comment"
  }, " // " + count + " " + (count === 1 ? "item" : "items")));
}

function JsonValue(_ref2) {
  var value = _ref2.value,
      children = _ref2.children;

  if (value === null || value === false || value === true || (0, _lodash.isFinite)(value)) {
    return /*#__PURE__*/_react.default.createElement("span", {
      className: "jvi-value jvi-primitive"
    }, "" + value, children);
  }

  if ((0, _lodash.isString)(value)) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
      className: "jvi-punctuation jvi-string"
    }, "\""), /*#__PURE__*/_react.default.createElement("span", {
      className: "jvi-value jvi-string"
    }, value), /*#__PURE__*/_react.default.createElement("span", {
      className: "jvi-punctuation jvi-string"
    }, "\""), children);
  }

  if ((0, _lodash.isArray)(value)) {
    return /*#__PURE__*/_react.default.createElement(JsonBlock, {
      value: value,
      openingBrace: "[",
      closingBrace: "]"
    }, children);
  }

  if ((0, _lodash.isObject)(value)) {
    return /*#__PURE__*/_react.default.createElement(JsonBlock, {
      value: value,
      openingBrace: "{",
      closingBrace: "}",
      withKeys: true
    }, children);
  }

  return null;
}

function JsonViewInteractive(_ref3) {
  var value = _ref3.value;
  return /*#__PURE__*/_react.default.createElement("span", {
    className: "jvi-item jvi-root"
  }, /*#__PURE__*/_react.default.createElement(JsonValue, {
    value: value
  }));
}

JsonViewInteractive.defaultProps = {
  // `null` will be rendered as "null" because it is a valid JSON value, so use `undefined` for no value
  value: undefined
};
//# sourceMappingURL=JsonViewInteractive.js.map