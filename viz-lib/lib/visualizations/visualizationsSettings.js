"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateVisualizationsSettings = updateVisualizationsSettings;
exports.visualizationsSettings = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HelpTrigger(_ref) {
  var title = _ref.title,
      href = _ref.href,
      className = _ref.className,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_tooltip.default, {
    title: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, title, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-external-link",
      style: {
        marginLeft: 5
      }
    }))
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: className,
    href: href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, children));
}

HelpTrigger.defaultValues = {
  title: null,
  className: null,
  children: null
};

function Link(props) {
  return /*#__PURE__*/_react.default.createElement("a", props);
}

var visualizationsSettings = {
  HelpTriggerComponent: HelpTrigger,
  LinkComponent: Link,
  dateFormat: "DD/MM/YYYY",
  dateTimeFormat: "DD/MM/YYYY HH:mm",
  integerFormat: "0,0",
  floatFormat: "0,0.00",
  booleanValues: ["false", "true"],
  tableCellMaxJSONSize: 50000,
  allowCustomJSVisualizations: false,
  hidePlotlyModeBar: false,
  choroplethAvailableMaps: {}
};
exports.visualizationsSettings = visualizationsSettings;

function updateVisualizationsSettings(options) {
  (0, _lodash.extend)(visualizationsSettings, options);
}
//# sourceMappingURL=visualizationsSettings.js.map