"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Renderer;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _table = _interopRequireDefault(require("antd/lib/table"));

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

var _propTypes = require("../../prop-types");

var _ColorPalette = _interopRequireDefault(require("../../ColorPalette"));

var _valueFormat = require("../../../lib/value-format");

var _prepareData = _interopRequireDefault(require("./prepareData"));

var _FunnelBar = _interopRequireDefault(require("./FunnelBar"));

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function generateRowKeyPrefix() {
  return Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER).toString(36) + ":";
}

function Renderer(_ref) {
  var data = _ref.data,
      options = _ref.options;
  var funnelData = (0, _react.useMemo)(() => (0, _prepareData.default)(data.rows, options), [data, options]); // eslint-disable-next-line react-hooks/exhaustive-deps

  var rowKeyPrefix = (0, _react.useMemo)(() => generateRowKeyPrefix(), [funnelData]);
  var formatValue = (0, _react.useMemo)(() => (0, _valueFormat.createNumberFormatter)(options.numberFormat), [options.numberFormat]);
  var formatPercentValue = (0, _react.useMemo)(() => {
    var format = (0, _valueFormat.createNumberFormatter)(options.percentFormat);
    return value => {
      if (value < options.percentValuesRange.min) {
        return "<".concat(format(options.percentValuesRange.min));
      }

      if (value > options.percentValuesRange.max) {
        return ">".concat(format(options.percentValuesRange.max));
      }

      return format(value);
    };
  }, [options.percentFormat, options.percentValuesRange]);
  var columns = (0, _react.useMemo)(() => {
    if (funnelData.length === 0) {
      return [];
    } // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.


    var maxToPrevious = (0, _lodash.maxBy)(funnelData, d => isFinite(d.pctPrevious) ? d.pctPrevious : 0).pctPrevious;
    return [{
      title: options.stepCol.displayAs,
      dataIndex: "step",
      width: "25%",
      className: "text-ellipsis",
      render: text => /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        title: text,
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0
      }, text)
    }, {
      title: options.valueCol.displayAs,
      dataIndex: "value",
      width: "45%",
      align: "center",
      render: (value, item) =>
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
      _react.default.createElement(_FunnelBar.default, {
        align: "center",
        color: _ColorPalette.default.Cyan,
        value: item.pctMax
      }, formatValue(value))
    }, {
      title: "% Max",
      dataIndex: "pctMax",
      width: "15%",
      align: "center",
      render: value => formatPercentValue(value)
    }, {
      title: "% Previous",
      dataIndex: "pctPrevious",
      width: "15%",
      align: "center",
      render: value =>
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
      _react.default.createElement(_FunnelBar.default, {
        className: "funnel-percent-column",
        value: value / maxToPrevious * 100.0
      }, formatPercentValue(value))
    }];
  }, [options.stepCol.displayAs, options.valueCol.displayAs, funnelData, formatValue, formatPercentValue]);

  if (funnelData.length === 0) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "funnel-visualization-container"
  }, /*#__PURE__*/_react.default.createElement(_table.default // @ts-expect-error ts-migrate(2322) FIXME: Type '({ title: any; dataIndex: string; width: str... Remove this comment to see the full error message
  , {
    columns: columns,
    dataSource: funnelData,
    rowKey: (record, index) => rowKeyPrefix + index,
    pagination: false
  }));
}

Renderer.propTypes = _propTypes.RendererPropTypes;
//# sourceMappingURL=index.js.map