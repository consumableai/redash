"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GeneralSettings;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _editor = require("../../../components/visualizations/editor");

var _createTabbedEditor = require("../../../components/visualizations/editor/createTabbedEditor");

var _propTypes = require("../../prop-types");

var _ChartTypeSelect = _interopRequireDefault(require("./ChartTypeSelect"));

var _ColumnMappingSelect = _interopRequireDefault(require("./ColumnMappingSelect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getAvailableColumnMappingTypes(options) {
  var result = ["x", "y"];

  if (!(0, _lodash.includes)(["custom", "heatmap"], options.globalSeriesType)) {
    result.push("series");
  }

  if (options.globalSeriesType === "bubble" || (0, _lodash.some)(options.seriesOptions, {
    type: "bubble"
  })) {
    result.push("size");
  }

  if (options.globalSeriesType === "heatmap") {
    result.push("zVal");
  }

  if (!(0, _lodash.includes)(["custom", "bubble", "heatmap"], options.globalSeriesType)) {
    result.push("yError");
  }

  return result;
}

function getMappedColumns(options, availableColumns) {
  var mappedColumns = {};
  var availableTypes = getAvailableColumnMappingTypes(options);
  (0, _lodash.each)(availableTypes, type => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    mappedColumns[type] = _ColumnMappingSelect.default.MappingTypes[type].multiple ? [] : null;
  });
  availableColumns = (0, _lodash.map)(availableColumns, c => c.name);
  var usedColumns = [];
  (0, _lodash.each)(options.columnMapping, (type, column) => {
    if ((0, _lodash.includes)(availableColumns, column) && (0, _lodash.includes)(availableTypes, type)) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      var multiple = _ColumnMappingSelect.default.MappingTypes[type].multiple;

      if (multiple) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        mappedColumns[type].push(column);
      } else {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        mappedColumns[type] = column;
      }

      usedColumns.push(column);
    }
  });
  return {
    mappedColumns,
    unusedColumns: (0, _lodash.difference)(availableColumns, usedColumns)
  };
}

function mappedColumnsToColumnMappings(mappedColumns) {
  var result = {};
  (0, _lodash.each)(mappedColumns, (value, type) => {
    if ((0, _lodash.isArray)(value)) {
      (0, _lodash.each)(value, v => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        result[v] = type;
      });
    } else {
      if (value) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        result[value] = type;
      }
    }
  });
  return result;
}

function GeneralSettings(_ref) {
  var options = _ref.options,
      data = _ref.data,
      onOptionsChange = _ref.onOptionsChange;

  var _useMemo = (0, _react.useMemo)(() => getMappedColumns(options, data.columns), [options, data.columns]),
      mappedColumns = _useMemo.mappedColumns,
      unusedColumns = _useMemo.unusedColumns;

  function handleGlobalSeriesTypeChange(globalSeriesType) {
    onOptionsChange({
      globalSeriesType,
      showDataLabels: globalSeriesType === "pie",
      swappedAxes: false,
      seriesOptions: (0, _lodash.mapValues)(options.seriesOptions, series => _objectSpread({}, series, {
        type: globalSeriesType
      }))
    });
  }

  function handleColumnMappingChange(column, type) {
    var columnMapping = mappedColumnsToColumnMappings(_objectSpread({}, mappedColumns, {
      [type]: column
    }));
    onOptionsChange({
      columnMapping
    }, _createTabbedEditor.UpdateOptionsStrategy.shallowMerge);
  }

  function handleLegendPlacementChange(value) {
    if (value === "hidden") {
      onOptionsChange({
        legend: {
          enabled: false
        }
      });
    } else {
      onOptionsChange({
        legend: {
          enabled: true,
          placement: value
        }
      });
    }
  }

  function handleAxesSwapping() {
    // moves any item in the right Y axis to the left one
    var seriesOptions = (0, _lodash.mapValues)(options.seriesOptions, series => _objectSpread({}, series, {
      yAxis: 0
    }));
    onOptionsChange({
      swappedAxes: !options.swappedAxes,
      seriesOptions
    });
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_ChartTypeSelect.default // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; "data-test": string; defaul... Remove this comment to see the full error message
  , {
    label: "Chart Type",
    "data-test": "Chart.GlobalSeriesType",
    defaultValue: options.globalSeriesType,
    onChange: handleGlobalSeriesTypeChange
  })), (0, _lodash.includes)(["column", "line", "box"], options.globalSeriesType) &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Chart.SwappedAxes",
    defaultChecked: options.swappedAxes,
    checked: options.swappedAxes,
    onChange: handleAxesSwapping
  }, "Horizontal Chart")), (0, _lodash.map)(mappedColumns, (value, type) => /*#__PURE__*/_react.default.createElement(_ColumnMappingSelect.default // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    key: type // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
    ,
    type: type,
    value: value // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    areAxesSwapped: options.swappedAxes // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown[]' is not assignable to type 'never'... Remove this comment to see the full error message
    ,
    availableColumns: unusedColumns // @ts-expect-error ts-migrate(2322) FIXME: Type '(column: any, type: any) => void' is not ass... Remove this comment to see the full error message
    ,
    onChange: handleColumnMappingChange
  })), (0, _lodash.includes)(["bubble"], options.globalSeriesType) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    label: "Bubble Size Coefficient",
    "data-test": "Chart.BubbleCoefficient",
    defaultValue: options.coefficient,
    onChange: value => onOptionsChange({
      coefficient: (0, _lodash.toNumber)(value)
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Bubble Size Proportional To",
    "data-test": "Chart.SizeMode",
    defaultValue: options.sizemode,
    onChange: mode => onOptionsChange({
      sizemode: mode
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "area",
    "data-test": "Chart.SizeMode.Area"
  }, "Area"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "diameter",
    "data-test": "Chart.SizeMode.Diameter"
  }, "Diameter")))), (0, _lodash.includes)(["pie"], options.globalSeriesType) &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Direction",
    "data-test": "Chart.PieDirection",
    defaultValue: options.direction.type,
    onChange: type => onOptionsChange({
      direction: {
        type
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "counterclockwise",
    "data-test": "Chart.PieDirection.Counterclockwise"
  }, "Counterclockwise"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "clockwise",
    "data-test": "Chart.PieDirection.Clockwise"
  }, "Clockwise"))), !(0, _lodash.includes)(["custom", "heatmap"], options.globalSeriesType) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Legend Placement",
    "data-test": "Chart.LegendPlacement",
    value: options.legend.enabled ? options.legend.placement : "hidden",
    onChange: handleLegendPlacementChange
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "hidden",
    "data-test": "Chart.LegendPlacement.HideLegend"
  }, "Hide legend"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "auto",
    "data-test": "Chart.LegendPlacement.Auto"
  }, "Right"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "below",
    "data-test": "Chart.LegendPlacement.Below"
  }, "Bottom"))), options.legend.enabled &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Legend Items Order",
    "data-test": "Chart.LegendItemsOrder",
    value: options.legend.traceorder,
    onChange: traceorder => onOptionsChange({
      legend: {
        traceorder
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "normal",
    "data-test": "Chart.LegendItemsOrder.Normal"
  }, "Normal"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "reversed",
    "data-test": "Chart.LegendItemsOrder.Reversed"
  }, "Reversed")))), (0, _lodash.includes)(["box"], options.globalSeriesType) &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Chart.ShowPoints",
    defaultChecked: options.showpoints,
    onChange: event => onOptionsChange({
      showpoints: event.target.checked
    })
  }, "Show All Points")), !(0, _lodash.includes)(["custom", "heatmap"], options.globalSeriesType) &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Stacking",
    "data-test": "Chart.Stacking",
    defaultValue: options.series.stacking,
    disabled: !(0, _lodash.includes)(["line", "area", "column"], options.globalSeriesType),
    onChange: stacking => onOptionsChange({
      series: {
        stacking
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: null,
    "data-test": "Chart.Stacking.Disabled"
  }, "Disabled"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "stack",
    "data-test": "Chart.Stacking.Stack"
  }, "Stack"))), (0, _lodash.includes)(["line", "area", "column"], options.globalSeriesType) &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Chart.NormalizeValues",
    defaultChecked: options.series.percentValues,
    onChange: event => onOptionsChange({
      series: {
        percentValues: event.target.checked
      }
    })
  }, "Normalize values to percentage")), !(0, _lodash.includes)(["custom", "heatmap", "bubble", "scatter"], options.globalSeriesType) &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Missing and NULL values",
    "data-test": "Chart.MissingValues",
    defaultValue: options.missingValuesAsZero ? 1 : 0,
    onChange: value => onOptionsChange({
      missingValuesAsZero: !!value
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: 0,
    "data-test": "Chart.MissingValues.Keep"
  }, "Do not display in chart"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: 1,
    "data-test": "Chart.MissingValues.Zero"
  }, "Convert to 0 and display in chart"))));
}

GeneralSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=GeneralSettings.js.map