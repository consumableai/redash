"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ChartTypeSelect;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _editor = require("../../../components/visualizations/editor");

var _visualizationsSettings = require("../../visualizationsSettings");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var allChartTypes = [{
  type: "line",
  name: "Line",
  icon: "line-chart"
}, {
  type: "column",
  name: "Bar",
  icon: "bar-chart"
}, {
  type: "area",
  name: "Area",
  icon: "area-chart"
}, {
  type: "pie",
  name: "Pie",
  icon: "pie-chart"
}, {
  type: "scatter",
  name: "Scatter",
  icon: "circle-o"
}, {
  type: "bubble",
  name: "Bubble",
  icon: "circle-o"
}, {
  type: "heatmap",
  name: "Heatmap",
  icon: "th"
}, {
  type: "box",
  name: "Box",
  icon: "square-o"
}];

function ChartTypeSelect(_ref) {
  var hiddenChartTypes = _ref.hiddenChartTypes,
      props = _objectWithoutProperties(_ref, ["hiddenChartTypes"]);

  var chartTypes = (0, _react.useMemo)(() => {
    var result = [...allChartTypes];

    if (_visualizationsSettings.visualizationsSettings.allowCustomJSVisualizations) {
      result.push({
        type: "custom",
        name: "Custom",
        icon: "code"
      });
    }

    if (hiddenChartTypes.length > 0) {
      return (0, _lodash.filter)(result, (_ref2) => {
        var type = _ref2.type;
        return !(0, _lodash.includes)(hiddenChartTypes, type);
      });
    }

    return result;
  }, []);
  return /*#__PURE__*/_react.default.createElement(_editor.Select, props, (0, _lodash.map)(chartTypes, (_ref3) => {
    var type = _ref3.type,
        name = _ref3.name,
        icon = _ref3.icon;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      _react.default.createElement(_editor.Select.Option, {
        key: type,
        value: type,
        "data-test": "Chart.ChartType.".concat(type)
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-".concat(icon),
        style: {
          marginRight: 5
        }
      }), name)
    );
  }));
}

ChartTypeSelect.defaultProps = {
  hiddenChartTypes: []
};
//# sourceMappingURL=ChartTypeSelect.js.map