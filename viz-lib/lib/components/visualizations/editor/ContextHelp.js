"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ContextHelp;

var _react = _interopRequireDefault(require("react"));

var _popover = _interopRequireDefault(require("antd/lib/popover"));

var _QuestionCircleFilled = _interopRequireDefault(require("@ant-design/icons/QuestionCircleFilled"));

var _visualizationsSettings = require("../../../visualizations/visualizationsSettings");

require("./context-help.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ContextHelp(_ref) {
  var icon = _ref.icon,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["icon", "children"]);

  return /*#__PURE__*/_react.default.createElement(_popover.default, _extends({}, props, {
    content: children
  }), icon || ContextHelp.defaultIcon);
}

ContextHelp.defaultProps = {
  icon: null,
  children: null
};
ContextHelp.defaultIcon = /*#__PURE__*/_react.default.createElement(_QuestionCircleFilled.default, {
  className: "context-help-default-icon"
});

function NumberFormatSpecs() {
  var HelpTriggerComponent = _visualizationsSettings.visualizationsSettings.HelpTriggerComponent;
  return /*#__PURE__*/_react.default.createElement(HelpTriggerComponent // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; type: string; title: st... Remove this comment to see the full error message
  , {
    type: "NUMBER_FORMAT_SPECS",
    title: "Formatting Numbers",
    href: "https://redash.io/help/user-guide/visualizations/formatting-numbers",
    className: "visualization-editor-context-help"
  }, ContextHelp.defaultIcon);
}

function DateTimeFormatSpecs() {
  var HelpTriggerComponent = _visualizationsSettings.visualizationsSettings.HelpTriggerComponent;
  return /*#__PURE__*/_react.default.createElement(HelpTriggerComponent, {
    title: "Formatting Dates and Times",
    href: "https://momentjs.com/docs/#/displaying/format/",
    className: "visualization-editor-context-help"
  }, ContextHelp.defaultIcon);
}

ContextHelp.NumberFormatSpecs = NumberFormatSpecs;
ContextHelp.DateTimeFormatSpecs = DateTimeFormatSpecs;
//# sourceMappingURL=ContextHelp.js.map