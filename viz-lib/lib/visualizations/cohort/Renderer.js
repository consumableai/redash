"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Renderer;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("../prop-types");

var _prepareData = _interopRequireDefault(require("./prepareData"));

require("./renderer.less");

var _Cornelius = _interopRequireDefault(require("./Cornelius"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Renderer(_ref) {
  var data = _ref.data,
      options = _ref.options;

  var _useMemo = (0, _react.useMemo)(() => (0, _prepareData.default)(data, options), [data, options]),
      cohortData = _useMemo.data,
      initialDate = _useMemo.initialDate;

  var corneliusOptions = (0, _react.useMemo)(() => ({
    initialDate,
    timeInterval: options.timeInterval,
    noValuePlaceholder: options.noValuePlaceholder,
    rawNumberOnHover: options.showTooltips,
    displayAbsoluteValues: !options.percentValues,
    timeColumnTitle: options.timeColumnTitle,
    peopleColumnTitle: options.peopleColumnTitle,
    stageColumnTitle: options.stageColumnTitle,
    numberFormat: options.numberFormat,
    percentFormat: options.percentFormat,
    colors: options.colors
  }), [options, initialDate]);

  if (cohortData.length === 0) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "cohort-visualization-container"
  }, /*#__PURE__*/_react.default.createElement(_Cornelius.default, {
    data: cohortData,
    options: corneliusOptions
  }));
}

Renderer.propTypes = _propTypes.RendererPropTypes;
//# sourceMappingURL=Renderer.js.map