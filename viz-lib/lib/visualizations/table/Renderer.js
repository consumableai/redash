"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Renderer;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _table = _interopRequireDefault(require("antd/lib/table"));

var _input = _interopRequireDefault(require("antd/lib/input"));

var _InfoCircleFilled = _interopRequireDefault(require("@ant-design/icons/InfoCircleFilled"));

var _popover = _interopRequireDefault(require("antd/lib/popover"));

var _propTypes = require("../prop-types");

var _utils = require("./utils");

require("./renderer.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function joinColumns(array) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ", ";
  return (0, _lodash.reduce)(array, (result, item, index) => {
    // @ts-expect-error ts-migrate(2365) FIXME: Operator '>' cannot be applied to types 'string' a... Remove this comment to see the full error message
    if (index > 0) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      result.push(separator);
    } // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message


    result.push(item);
    return result;
  }, []);
}

function getSearchColumns(columns) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$limit = _ref.limit,
      limit = _ref$limit === void 0 ? Infinity : _ref$limit,
      _ref$renderColumn = _ref.renderColumn,
      renderColumn = _ref$renderColumn === void 0 ? col => col.title : _ref$renderColumn;

  var firstColumns = (0, _lodash.map)(columns.slice(0, limit), col => renderColumn(col));
  var restColumns = (0, _lodash.map)(columns.slice(limit), col => col.title);

  if (restColumns.length > 0) {
    return [...joinColumns(firstColumns), " and ".concat(restColumns.length, " others")];
  }

  if (firstColumns.length > 1) {
    return [...joinColumns((0, _lodash.initial)(firstColumns)), " and ", (0, _lodash.last)(firstColumns)];
  }

  return firstColumns;
}

function SearchInputInfoIcon(_ref2) {
  var searchColumns = _ref2.searchColumns;
  return /*#__PURE__*/_react.default.createElement(_popover.default, {
    arrowPointAtCenter: true,
    placement: "topRight",
    content: /*#__PURE__*/_react.default.createElement("div", {
      className: "table-visualization-search-info-content"
    }, "Search ", getSearchColumns(searchColumns, {
      renderColumn: col => /*#__PURE__*/_react.default.createElement("code", {
        key: col.name
      }, col.title)
    }))
  }, /*#__PURE__*/_react.default.createElement(_InfoCircleFilled.default, {
    className: "table-visualization-search-info-icon"
  }));
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'searchColumns' does not exist on type 'S... Remove this comment to see the full error message
function SearchInput(_ref3) {
  var searchColumns = _ref3.searchColumns,
      props = _objectWithoutProperties(_ref3, ["searchColumns"]);

  if (searchColumns.length <= 0) {
    return null;
  }

  var searchColumnsLimit = 3;
  return /*#__PURE__*/_react.default.createElement(_input.default.Search, _extends({}, props, {
    placeholder: "Search ".concat(getSearchColumns(searchColumns, {
      limit: searchColumnsLimit
    }).join(""), "..."),
    suffix: searchColumns.length > searchColumnsLimit ? /*#__PURE__*/_react.default.createElement(SearchInputInfoIcon, {
      searchColumns: searchColumns
    }) : null
  }));
}

SearchInput.defaultProps = {
  onChange: () => {}
};

function Renderer(_ref4) {
  var options = _ref4.options,
      data = _ref4.data;

  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      searchTerm = _useState2[0],
      setSearchTerm = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      orderBy = _useState4[0],
      setOrderBy = _useState4[1];

  var searchColumns = (0, _react.useMemo)(() => (0, _lodash.filter)(options.columns, "allowSearch"), [options.columns]);
  var tableColumns = (0, _react.useMemo)(() => {
    var searchInput = searchColumns.length > 0 ?
    /*#__PURE__*/
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(event: any) => void' is not assignable to t... Remove this comment to see the full error message
    _react.default.createElement(SearchInput, {
      searchColumns: searchColumns,
      onChange: event => setSearchTerm(event.target.value)
    }) : null;
    return (0, _utils.prepareColumns)(options.columns, searchInput, orderBy, newOrderBy => {
      setOrderBy(newOrderBy); // Remove text selection - may occur accidentally
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.

      document.getSelection().removeAllRanges();
    });
  }, [options.columns, searchColumns, orderBy]);
  var preparedRows = (0, _react.useMemo)(() => (0, _utils.sortRows)((0, _utils.filterRows)((0, _utils.initRows)(data.rows), searchTerm, searchColumns), orderBy), [data.rows, searchTerm, searchColumns, orderBy]); // If data or config columns change - reset sorting

  (0, _react.useEffect)(() => {
    setOrderBy([]);
  }, [options.columns, data.columns]);

  if (data.rows.length === 0) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "table-visualization-container"
  }, /*#__PURE__*/_react.default.createElement(_table.default, {
    className: "table-fixed-header",
    "data-percy": "show-scrollbars",
    "data-test": "TableVisualization" // @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: any; dataIndex: string; align: any; s... Remove this comment to see the full error message
    ,
    columns: tableColumns,
    dataSource: preparedRows,
    pagination: {
      size: (0, _lodash.get)(options, "paginationSize", ""),
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'TablePagi... Remove this comment to see the full error message
      position: "bottom",
      pageSize: options.itemsPerPage,
      hideOnSinglePage: true,
      showSizeChanger: false
    },
    showSorterTooltip: false
  }));
}

Renderer.propTypes = _propTypes.RendererPropTypes;
//# sourceMappingURL=Renderer.js.map