"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SeriesSettings;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _useDebounce = require("use-debounce");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _input = _interopRequireDefault(require("antd/lib/input"));

var _radio = _interopRequireDefault(require("antd/lib/radio"));

var _reactSortableHoc = require("react-sortable-hoc");

var _sortable = require("../../../components/sortable");

var _propTypes = require("../../prop-types");

var _ChartTypeSelect = _interopRequireDefault(require("./ChartTypeSelect"));

var _getChartData = _interopRequireDefault(require("../getChartData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SortableBodyRow = (0, _reactSortableHoc.sortableElement)(props => /*#__PURE__*/_react.default.createElement("tr", props));

function getTableColumns(options, updateSeriesOption, debouncedUpdateSeriesOption) {
  var result = [{
    title: "Order",
    dataIndex: "zIndex",
    render: (unused, item) => /*#__PURE__*/_react.default.createElement("span", {
      className: "series-settings-order"
    }, /*#__PURE__*/_react.default.createElement(_sortable.DragHandle, null), item.zIndex + 1)
  }, {
    title: "Label",
    dataIndex: "name",
    render: (unused, item) => /*#__PURE__*/_react.default.createElement(_input.default, {
      "data-test": "Chart.Series.".concat(item.key, ".Label"),
      placeholder: item.key,
      defaultValue: item.name,
      onChange: event => debouncedUpdateSeriesOption(item.key, "name", event.target.value)
    })
  }];

  if (!(0, _lodash.includes)(["pie", "heatmap"], options.globalSeriesType)) {
    if (!options.swappedAxes) {
      result.push({
        title: "Y Axis",
        dataIndex: "yAxis",
        render: (unused, item) => /*#__PURE__*/_react.default.createElement(_radio.default.Group, {
          className: "series-settings-y-axis",
          value: item.yAxis === 1 ? 1 : 0,
          onChange: event => updateSeriesOption(item.key, "yAxis", event.target.value)
        }, /*#__PURE__*/_react.default.createElement(_radio.default, {
          value: 0,
          "data-test": "Chart.Series.".concat(item.key, ".UseLeftAxis")
        }, "left"), /*#__PURE__*/_react.default.createElement(_radio.default, {
          value: 1,
          "data-test": "Chart.Series.".concat(item.key, ".UseRightAxis")
        }, "right"))
      });
    }

    result.push({
      title: "Type",
      dataIndex: "type",
      render: (unused, item) => /*#__PURE__*/_react.default.createElement(_ChartTypeSelect.default, {
        "data-test": "Chart.Series.".concat(item.key, ".Type"),
        dropdownMatchSelectWidth: false,
        value: item.type // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
        ,
        hiddenChartTypes: ["pie", "heatmap", "bubble", "box"],
        onChange: value => updateSeriesOption(item.key, "type", value)
      })
    });
  }

  return result;
}

function SeriesSettings(_ref) {
  var options = _ref.options,
      data = _ref.data,
      onOptionsChange = _ref.onOptionsChange;
  var series = (0, _react.useMemo)(() => (0, _lodash.map)((0, _getChartData.default)(data.rows, options), // returns sorted series
  (_ref2, zIndex) => {
    var name = _ref2.name;
    return (0, _lodash.extend)({
      key: name,
      type: options.globalSeriesType
    }, options.seriesOptions[name], {
      zIndex
    });
  }), [options, data]);
  var handleSortEnd = (0, _react.useCallback)((_ref3) => {
    var oldIndex = _ref3.oldIndex,
        newIndex = _ref3.newIndex;
    var seriesOptions = [...series];
    seriesOptions.splice(newIndex, 0, ...seriesOptions.splice(oldIndex, 1)); // @ts-expect-error ts-migrate(2339) FIXME: Property 'key' does not exist on type 'Boolean'.

    onOptionsChange({
      seriesOptions: (0, _lodash.fromPairs)((0, _lodash.map)(seriesOptions, (_ref4, zIndex) => {
        var key = _ref4.key;
        return [key, {
          zIndex
        }];
      }))
    });
  }, [onOptionsChange, series]);
  var updateSeriesOption = (0, _react.useCallback)((key, prop, value) => {
    onOptionsChange({
      seriesOptions: {
        [key]: {
          [prop]: value
        }
      }
    });
  }, [onOptionsChange]);

  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(updateSeriesOption, 200),
      _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
      debouncedUpdateSeriesOption = _useDebouncedCallback2[0];

  var columns = (0, _react.useMemo)(() => getTableColumns(options, updateSeriesOption, debouncedUpdateSeriesOption), [options, updateSeriesOption, debouncedUpdateSeriesOption]);
  return /*#__PURE__*/_react.default.createElement(_sortable.SortableContainer, {
    axis: "y",
    lockAxis: "y",
    lockToContainerEdges: true,
    useDragHandle: true,
    helperClass: "chart-editor-series-dragged-item",
    helperContainer: container => container.querySelector("tbody"),
    onSortEnd: handleSortEnd,
    containerProps: {
      className: "chart-editor-series"
    }
  }, /*#__PURE__*/_react.default.createElement(_table.default // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean[]' is not assignable to type 'object... Remove this comment to see the full error message
  , {
    dataSource: series,
    columns: columns,
    components: {
      body: {
        row: SortableBodyRow
      }
    } // @ts-expect-error ts-migrate(2322) FIXME: Type '(item: object) => { index: any; }' is not as... Remove this comment to see the full error message
    ,
    onRow: item => ({
      index: item.zIndex
    }),
    pagination: false
  }));
}

SeriesSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=SeriesSettings.js.map