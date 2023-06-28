"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortableContainer = SortableContainer;
exports.SortableElement = exports.SortableContainerWrapper = exports.DragHandle = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactSortableHoc = require("react-sortable-hoc");

require("./style.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DragHandle = (0, _reactSortableHoc.sortableHandle)((_ref) => {
  var className = _ref.className,
      restProps = _objectWithoutProperties(_ref, ["className"]);

  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)("drag-handle", className)
  }, restProps));
});
exports.DragHandle = DragHandle;
var SortableContainerWrapper = (0, _reactSortableHoc.sortableContainer)((_ref2) => {
  var children = _ref2.children;
  return children;
});
exports.SortableContainerWrapper = SortableContainerWrapper;
var SortableElement = (0, _reactSortableHoc.sortableElement)((_ref3) => {
  var children = _ref3.children;
  return children;
});
exports.SortableElement = SortableElement;

function SortableContainer(_ref4) {
  var disabled = _ref4.disabled,
      containerComponent = _ref4.containerComponent,
      containerProps = _ref4.containerProps,
      children = _ref4.children,
      wrapperProps = _objectWithoutProperties(_ref4, ["disabled", "containerComponent", "containerProps", "children"]);

  var containerRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isDragging = _useState2[0],
      setIsDragging = _useState2[1];

  wrapperProps = _objectSpread({}, wrapperProps);
  containerProps = _objectSpread({}, containerProps);

  if (disabled) {
    // Disabled state:
    // - forbid drag'n'drop (and therefore no need to hook events
    // - don't override anything on container element
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'shouldCancelStart' does not exist on typ... Remove this comment to see the full error message
    wrapperProps.shouldCancelStart = () => true;
  } else {
    // Enabled state:
    // - use container element as a default helper element
    // @ts-expect-error
    wrapperProps.helperContainer = (0, _lodash.wrap)(wrapperProps.helperContainer, helperContainer => (0, _lodash.isFunction)(helperContainer) ? helperContainer(containerRef.current) : containerRef.current); // - hook drag start/end events
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateBeforeSortStart' does not exist on... Remove this comment to see the full error message

    wrapperProps.updateBeforeSortStart = (0, _lodash.wrap)(wrapperProps.updateBeforeSortStart, function (updateBeforeSortStart) {
      setIsDragging(true);

      if ((0, _lodash.isFunction)(updateBeforeSortStart)) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        updateBeforeSortStart(...args);
      }
    }); // @ts-expect-error

    wrapperProps.onSortStart = (0, _lodash.wrap)(wrapperProps.onSortStart, function (onSortStart) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if ((0, _lodash.isFunction)(onSortStart)) {
        onSortStart(...args);
      } else {
        var event = args[1];
        event.preventDefault();
      }
    }); // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSortEnd' does not exist on type '{}'.

    wrapperProps.onSortEnd = (0, _lodash.wrap)(wrapperProps.onSortEnd, function (onSortEnd) {
      setIsDragging(false);

      if ((0, _lodash.isFunction)(onSortEnd)) {
        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        onSortEnd(...args);
      }
    }); // - update container element: add classes and take a ref

    containerProps.className = (0, _classnames.default)("sortable-container", {
      "sortable-container-dragging": isDragging
    }, containerProps.className);
    containerProps.ref = containerRef;
  }

  var ContainerComponent = containerComponent;
  return /*#__PURE__*/_react.default.createElement(SortableContainerWrapper, wrapperProps, /*#__PURE__*/_react.default.createElement(ContainerComponent, containerProps, children));
}

SortableContainer.defaultProps = {
  disabled: false,
  containerComponent: "div",
  containerProps: {},
  children: null
};
//# sourceMappingURL=index.js.map