"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Renderer;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _ErrorBoundary = _interopRequireWildcard(require("../components/ErrorBoundary"));

var _registeredVisualizations = _interopRequireDefault(require("./registeredVisualizations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Renderer(_ref) {
  var type = _ref.type,
      data = _ref.data,
      optionsProp = _ref.options,
      visualizationName = _ref.visualizationName,
      addonBefore = _ref.addonBefore,
      addonAfter = _ref.addonAfter,
      otherProps = _objectWithoutProperties(_ref, ["type", "data", "options", "visualizationName", "addonBefore", "addonAfter"]);

  var lastOptions = (0, _react.useRef)();
  var errorHandlerRef = (0, _react.useRef)(); // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message

  var _registeredVisualizat = _registeredVisualizations.default[type],
      Renderer = _registeredVisualizat.Renderer,
      getOptions = _registeredVisualizat.getOptions; // Avoid unnecessary updates (which may be expensive or cause issues with
  // internal state of some visualizations like Table) - compare options deeply
  // and use saved reference if nothing changed
  // More details: https://github.com/getredash/redash/pull/3963#discussion_r306935810

  var options = getOptions(optionsProp, data);

  if ((0, _lodash.isEqual)(lastOptions.current, options)) {
    options = lastOptions.current;
  }

  lastOptions.current = options;
  (0, _react.useEffect)(() => {
    if (errorHandlerRef.current) {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      errorHandlerRef.current.reset();
    }
  }, [optionsProp, data]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "visualization-renderer"
  }, addonBefore, /*#__PURE__*/_react.default.createElement(_ErrorBoundary.default, {
    ref: errorHandlerRef,
    renderError: () => /*#__PURE__*/_react.default.createElement(_ErrorBoundary.ErrorMessage, null, "Error while rendering visualization.")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "visualization-renderer-wrapper"
  }, /*#__PURE__*/_react.default.createElement(Renderer, _extends({
    options: options,
    data: data,
    visualizationName: visualizationName
  }, otherProps)))), addonAfter);
}
//# sourceMappingURL=Renderer.js.map