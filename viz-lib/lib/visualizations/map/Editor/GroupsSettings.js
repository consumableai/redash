"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GroupsSettings;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _table = _interopRequireDefault(require("antd/lib/table"));

var _ColorPicker = _interopRequireDefault(require("../../../components/ColorPicker"));

var _propTypes = require("../../prop-types");

var _ColorPalette = _interopRequireDefault(require("../../ColorPalette"));

var _prepareData = _interopRequireDefault(require("../prepareData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function GroupsSettings(_ref) {
  var options = _ref.options,
      data = _ref.data,
      onOptionsChange = _ref.onOptionsChange;
  var groups = (0, _react.useMemo)(() => (0, _lodash.map)((0, _prepareData.default)(data, options), (_ref2) => {
    var name = _ref2.name;
    return {
      name,
      color: (options.groups[name] || {}).color || null
    };
  }), [data, options]);
  var colors = (0, _react.useMemo)(() => _objectSpread({
    Automatic: null
  }, _ColorPalette.default), []);
  var updateGroupOption = (0, _react.useCallback)((name, prop, value) => {
    onOptionsChange({
      groups: {
        [name]: {
          [prop]: value
        }
      }
    });
  }, [onOptionsChange]);
  var columns = [{
    title: "Group",
    dataIndex: "name"
  }, {
    title: "Color",
    dataIndex: "color",
    width: "1%",
    render: (unused, item) => /*#__PURE__*/_react.default.createElement(_ColorPicker.default // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
    , {
      interactive: true // @ts-expect-error ts-migrate(2322) FIXME: Type '{ "Indian Red": string; "Green 2": string; "... Remove this comment to see the full error message
      ,
      presetColors: colors // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
      ,
      placement: "topRight" // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
      ,
      color: item.color // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
      ,
      triggerProps: {
        "data-test": "Map.Editor.Groups.".concat(item.name, ".Color")
      } // @ts-expect-error ts-migrate(2322) FIXME: Type '(value: any) => void' is not assignable to t... Remove this comment to see the full error message
      ,
      onChange: value => updateGroupOption(item.name, "color", value) // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'never'.
      ,
      addonAfter: /*#__PURE__*/_react.default.createElement(_ColorPicker.default.Label, {
        color: item.color,
        presetColors: colors
      })
    })
  }];
  return /*#__PURE__*/_react.default.createElement(_table.default, {
    columns: columns,
    dataSource: groups,
    rowKey: "name",
    showHeader: false,
    pagination: false
  });
}

GroupsSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=GroupsSettings.js.map