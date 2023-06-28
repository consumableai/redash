"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Renderer;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _resizeObserver = _interopRequireDefault(require("../../services/resizeObserver"));

var _propTypes = require("../prop-types");

var _utils = require("./utils");

require("./render.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getCounterStyles(scale) {
  return {
    msTransform: "scale(".concat(scale, ")"),
    MozTransform: "scale(".concat(scale, ")"),
    WebkitTransform: "scale(".concat(scale, ")"),
    transform: "scale(".concat(scale, ")")
  };
}

function getCounterScale(container) {
  var inner = container.firstChild;
  var scale = Math.min(container.offsetWidth / inner.offsetWidth, container.offsetHeight / inner.offsetHeight);
  return Number((0, _lodash.isFinite)(scale) ? scale : 1).toFixed(2); // keep only two decimal places
}

function Renderer(_ref) {
  var data = _ref.data,
      options = _ref.options,
      visualizationName = _ref.visualizationName;

  var _useState = (0, _react.useState)("1.00"),
      _useState2 = _slicedToArray(_useState, 2),
      scale = _useState2[0],
      setScale = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      container = _useState4[0],
      setContainer = _useState4[1];

  (0, _react.useEffect)(() => {
    if (container) {
      var unwatch = (0, _resizeObserver.default)(container, () => {
        setScale(getCounterScale(container));
      });
      return unwatch;
    }
  }, [container]);
  (0, _react.useEffect)(() => {
    if (container) {
      // update scaling when options or data change (new formatting, values, etc.
      // may change inner container dimensions which will not be tracked by `resizeObserver`);
      setScale(getCounterScale(container));
    }
  }, [data, options, container]);

  var _getCounterData = (0, _utils.getCounterData)(data.rows, options, visualizationName),
      showTrend = _getCounterData.showTrend,
      trendPositive = _getCounterData.trendPositive,
      counterValue = _getCounterData.counterValue,
      counterValueTooltip = _getCounterData.counterValueTooltip,
      targetValue = _getCounterData.targetValue,
      targetValueTooltip = _getCounterData.targetValueTooltip,
      counterLabel = _getCounterData.counterLabel;

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)("counter-visualization-container", {
      "trend-positive": showTrend && trendPositive,
      "trend-negative": showTrend && !trendPositive
    })
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "counter-visualization-content",
    ref: setContainer
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: getCounterStyles(scale)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "counter-visualization-value",
    title: counterValueTooltip
  }, counterValue), targetValue && /*#__PURE__*/_react.default.createElement("div", {
    className: "counter-visualization-target",
    title: targetValueTooltip
  }, "(", targetValue, ")"), /*#__PURE__*/_react.default.createElement("div", {
    className: "counter-visualization-label"
  }, counterLabel))));
}

Renderer.propTypes = _propTypes.RendererPropTypes;
//# sourceMappingURL=Renderer.js.map