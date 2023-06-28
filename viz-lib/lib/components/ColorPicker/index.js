"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColorPicker;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _popover = _interopRequireDefault(require("antd/lib/popover"));

var _card = _interopRequireDefault(require("antd/lib/card"));

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

var _chooseTextColorForBackground = _interopRequireDefault(require("../../lib/chooseTextColorForBackground"));

var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));

var _CheckOutlined = _interopRequireDefault(require("@ant-design/icons/CheckOutlined"));

var _Input = _interopRequireDefault(require("./Input"));

var _Swatch = _interopRequireDefault(require("./Swatch"));

var _Label = _interopRequireDefault(require("./Label"));

var _utils = require("./utils");

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ColorPicker(_ref) {
  var color = _ref.color,
      placement = _ref.placement,
      presetColors = _ref.presetColors,
      presetColumns = _ref.presetColumns,
      interactive = _ref.interactive,
      children = _ref.children,
      onChange = _ref.onChange,
      triggerProps = _ref.triggerProps,
      addonBefore = _ref.addonBefore,
      addonAfter = _ref.addonAfter;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var validatedColor = (0, _react.useMemo)(() => (0, _utils.validateColor)(color), [color]);

  var _useState3 = (0, _react.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      currentColor = _useState4[0],
      setCurrentColor = _useState4[1];

  function handleApply() {
    setVisible(false);

    if (!interactive) {
      // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
      onChange(currentColor);
    }
  }

  function handleCancel() {
    setVisible(false);
  }

  var actions = [];

  if (!interactive) {
    actions.push( /*#__PURE__*/_react.default.createElement(_tooltip.default, {
      key: "cancel",
      title: "Cancel"
    }, /*#__PURE__*/_react.default.createElement(_CloseOutlined.default, {
      onClick: handleCancel
    })));
    actions.push( /*#__PURE__*/_react.default.createElement(_tooltip.default, {
      key: "apply",
      title: "Apply"
    }, /*#__PURE__*/_react.default.createElement(_CheckOutlined.default, {
      onClick: handleApply
    })));
  }

  function handleInputChange(newColor) {
    setCurrentColor(newColor);

    if (interactive) {
      // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
      onChange(newColor);
    }
  }

  (0, _react.useEffect)(() => {
    if (visible) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
      setCurrentColor(validatedColor);
    }
  }, [validatedColor, visible]);
  return /*#__PURE__*/_react.default.createElement("span", {
    className: "color-picker-wrapper"
  }, addonBefore, /*#__PURE__*/_react.default.createElement(_popover.default, {
    arrowPointAtCenter: true,
    overlayClassName: "color-picker ".concat(interactive ? "color-picker-interactive" : "color-picker-with-actions") // @ts-expect-error ts-migrate(2322) FIXME: Type '{ "--color-picker-selected-color": string; }... Remove this comment to see the full error message
    ,
    overlayStyle: {
      "--color-picker-selected-color": currentColor
    },
    content: /*#__PURE__*/_react.default.createElement(_card.default, {
      "data-test": "ColorPicker",
      className: "color-picker-panel",
      bordered: false,
      title: (0, _lodash.toString)(currentColor).toUpperCase(),
      headStyle: {
        backgroundColor: currentColor,
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        color: (0, _chooseTextColorForBackground.default)(currentColor)
      },
      actions: actions
    }, /*#__PURE__*/_react.default.createElement(_Input.default // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
    , {
      color: currentColor,
      presetColors: presetColors,
      presetColumns: presetColumns // @ts-expect-error ts-migrate(2322) FIXME: Type '(newColor: any) => void' is not assignable t... Remove this comment to see the full error message
      ,
      onChange: handleInputChange // @ts-expect-error ts-migrate(2322) FIXME: Type '() => void' is not assignable to type 'never... Remove this comment to see the full error message
      ,
      onPressEnter: handleApply
    })),
    trigger: "click",
    placement: placement,
    visible: visible,
    onVisibleChange: setVisible
  }, children || /*#__PURE__*/_react.default.createElement(_Swatch.default, _extends({
    color: validatedColor,
    size: 30
  }, triggerProps, {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'never... Remove this comment to see the full error message
    className: (0, _classnames.default)("color-picker-trigger", triggerProps.className)
  }))), addonAfter);
}

ColorPicker.defaultProps = {
  color: "#FFFFFF",
  placement: "top",
  presetColors: null,
  presetColumns: 8,
  interactive: false,
  triggerProps: {},
  children: null,
  addonBefore: null,
  addonAfter: null,
  onChange: () => {}
};
ColorPicker.Input = _Input.default;
ColorPicker.Swatch = _Swatch.default;
ColorPicker.Label = _Label.default;
//# sourceMappingURL=index.js.map